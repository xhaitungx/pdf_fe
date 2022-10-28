import React from "react";
import MultiButton from "../../components/multi-button";
import MenuPopup from "../../components/popups/popup-menu";
import NotePopup from "../../components/popups/popup-notes";
import Loading from "../../components/loading";
import { ViewerProps, ViewerState } from "./interface";
import { BookApi, NoteApi } from "../../api";
import localforage from "localforage";
import { setTimeout } from "timers";
import "./style.css";
class Viewer extends React.Component<ViewerProps, ViewerState> {
  constructor(props: ViewerProps) {
    super(props);
    this.state = {
      noteText: "",
      isValidBook: false,
      isOpenNote: false,
      loading: true,
      pageX: 0,
      pageY: 0,
    };
  }

  setStopLoading = () => {
    this.setState({
      loading: false
    });
  }

  async componentDidMount() {
    const bookId = window.location.search.split("=").reverse()[0];
    const result = await BookApi("getBook", bookId);
    document.title = result.books[0].name;
    localforage.setItem("currentBook", {
      Content: result.books[0].content.data,
      md5: result.books[0].md5,
    });
    this.props.handleFetchBookNotes(null);
    this.setState({
      isValidBook: true
    })
  }

  async componentDidUpdate() {
    if (!this.props.bookNotes && !this.state.loading) {
      const res = await NoteApi("getBookNotes");
      if (res && res.status === 200) {
        this.props.handleFetchBookNotes(res.data);
        if(res.data.list.length >= 1)
        setTimeout(() => {
          this.showPDFHighlight();
        }, 3000)
      }
    }
  }

  showPDFHighlight = async () => {
    let iWin = this.getPDFIframeDoc();
    let oldNotes = iWin.document.querySelectorAll(".note");
    await oldNotes.forEach((note: any) => {
      note.remove();
    });
    if (!iWin) return;
    if (this.props.bookNotes)
      this.props.bookNotes.list.map((note) => {
        const selected = JSON.parse(note.range);
        var pageIndex = selected.page;
        if (!iWin.PDFViewerApplication.pdfViewer) return;
        var page = iWin.PDFViewerApplication.pdfViewer.getPageView(pageIndex);
        if (page && page.div) {
          var pageElement = page.div;
          var viewport = page.viewport;
          selected.coords.forEach((rect) => {
            var bounds = viewport.convertToViewportRectangle(rect);
            var el = iWin.document.createElement("div") as HTMLElement;
            el.setAttribute("id", note._id);
            el.setAttribute("class", "note");
            el.setAttribute(
              "style",
              "position: absolute;" +
              "cursor: pointer;" +
              "opacity: 0.2;" +
              "background-color:" +
              note.color +
              "; left:" +
              Math.min(bounds[0], bounds[2]) +
              "px; top:" +
              Math.min(bounds[1], bounds[3]) +
              "px;" +
              "width:" +
              Math.abs(bounds[0] - bounds[2]) +
              "px; height:" +
              Math.abs(bounds[1] - bounds[3]) +
              "px; z-index:99;"
            );
            el.addEventListener("click", (event: any) => {
              this.handlePDFClick(event);
            });
            pageElement.appendChild(el);
          });
        }
      });
  };

  getPDFIframeDoc = () => {
    let pageArea = document.getElementById("page-area");
    if (!pageArea) return null;
    let iframe = pageArea.getElementsByTagName("iframe")[0];
    if (!iframe) return null;
    let iWin: any = iframe.contentWindow;
    if (!iWin) return null;
    return iWin;
  };

  handlePDFClick = (e: any) => {
    if (this.props.bookNotes) {
      let noteId = e.currentTarget.getAttribute("id");
      let clickedNote = this.props.bookNotes.list.find(
        (note) => note._id === noteId
      );
      if (!clickedNote) return;
      this.setState({
        isOpenNote: true,
        noteText: clickedNote.note,
        pageX: e.clientX,
        pageY: e.clientY,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.loading &&
          <Loading />}

        {this.state.isValidBook && <div className="ebook-viewer" id="page-area">
          {this.state.isOpenNote && (
            <div
              style={{
                position: "fixed",
                top: this.state.pageY + "px",
                left: this.state.pageX + "px",
                transform: "translate(-125px, -62px)",
                background: "green",
                width: "250px",
                height: "120px",
                padding: "14px 4px",
                borderRadius: "5px",
                backgroundColor: "#3dabab",
              }}
              onMouseLeave={(e) =>
                this.setState({
                  isOpenNote: false,
                })
              }
            >
              <textarea
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "1rem 0.5rem",
                }}
                value={this.state.noteText}
              />
            </div>
          )}
          <MenuPopup />
          <MultiButton />
          <iframe
            src={`./lib/pdf/web/viewer.html${window.location.search}`}
            width="100%"
            height="100%"
            onLoad={this.setStopLoading}
          >
            Loading
          </iframe>
        </div>}
      </>
    );
  }
}
export default Viewer;
