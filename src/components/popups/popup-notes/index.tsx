import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleFetchBookNotes } from "../../../store/actions";
import localforage from "localforage";
import { Button } from "@mui/material";
import "./style.css";
import { NoteApi } from "../../../api";
const NotePopup = (props) => {
  const [note, setNote] = useState({
    content: "",
    color: "#ffc701",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const textField = document.querySelector(
      ".pop-up-note-input"
    ) as HTMLInputElement;
    textField.focus();
  });

  const hightlightColor = [
    "#ffc701",
    "#ef5a68",
    "#c7e372",
    "#9ad0dc",
    "#d4ddda",
  ];

  const getPDFLocation = (fingerprint: string) => {
    let json = localStorage.getItem("pdfjs.history");
    let arr = JSON.parse(json || "{}").files || [];
    return JSON.stringify(
      arr[arr.map((el) => el.fingerprint).lastIndexOf(fingerprint)] || {}
    );
  };

  const getHightlightCoords = () => {
    let pageArea = document.getElementById("page-area");
    if (!pageArea) return;
    let iframe = pageArea.getElementsByTagName("iframe")[0];
    if (!iframe) return;
    let iWin: any = iframe.contentWindow;
    var pageIndex = iWin!.PDFViewerApplication.pdfViewer.currentPageNumber - 1;
    var page = iWin!.PDFViewerApplication.pdfViewer.getPageView(pageIndex);
    var pageRect = page.canvas.getClientRects()[0];
    var selectionRects = iWin.getSelection()!.getRangeAt(0).getClientRects();
    var viewport = page.viewport;
    let tempRect: {
      bottom: number;
      top: number;
      left: number;
      right: number;
    }[] = [];
    for (let i = 0; i < selectionRects.length; i++) {
      if (i === 0) {
        tempRect.push({
          bottom: selectionRects[i].bottom,
          top: selectionRects[i].top,
          left: selectionRects[i].left,
          right: selectionRects[i].right,
        });
      } else if (
        Math.abs(
          tempRect[tempRect.length - 1].bottom - selectionRects[i].bottom
        ) < 5
      ) {
        if (tempRect[tempRect.length - 1].left > selectionRects[i].left) {
          tempRect[tempRect.length - 1].left = selectionRects[i].left;
        }
        if (tempRect[tempRect.length - 1].right < selectionRects[i].right) {
          tempRect[tempRect.length - 1].right = selectionRects[i].right;
        }
      } else {
        tempRect.push({
          bottom: selectionRects[i].bottom,
          top: selectionRects[i].top,
          left: selectionRects[i].left,
          right: selectionRects[i].right,
        });
      }
    }
    var selected = tempRect.map(function (r: any) {
      return viewport
        .convertToPdfPoint(r.left - pageRect.x, r.top - pageRect.y)
        .concat(
          viewport.convertToPdfPoint(
            r.right - pageRect.x,
            r.bottom - pageRect.y
          )
        );
    });
    return JSON.stringify({ page: pageIndex, coords: selected });
  };

  const onSubmit = async () => {
    const currentBook: any = await localforage.getItem("currentBook");
    let cfi = await getPDFLocation(currentBook.md5);
    let range = await getHightlightCoords();
    const notes = {
      note: note.content,
      text: props.text,
      color: note.color,
      cfi,
      range,
    };
    const res = await NoteApi("addNote", { notes });
    if (res && res.status === 200) {
      props.closeMenu();
      dispatch(handleFetchBookNotes(null));
    }
  };

  const onInputNote = (e) => {
    setNote({ ...note, content: e.target.value });
  };

  return (
    <>
      <div className="pop-up-note">
        <textarea
          className="pop-up-note-input"
          value={note.content}
          onChange={onInputNote}
        />
        <div className="pop-up-note-highlight">
          {hightlightColor.map((color, index) => (
            <div
              key={index}
              className="highlight-button"
              style={{
                background: color,
                border: note.color === color ? "2px solid black" : "",
              }}
              onClick={(e) => setNote({ ...note, color })}
            ></div>
          ))}
        </div>
      </div>
      <div className="pop-up-menu-buttons">
        <Button sx={{ color: "white" }} onClick={props.closeMenu}>
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "black",
            background: "white",
            "&:hover": {
              background: "white",
            },
          }}
          onClick={onSubmit}
        >
          Lưu
        </Button>
      </div>
    </>
  );
};

export default NotePopup;
