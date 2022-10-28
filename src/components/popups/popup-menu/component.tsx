import React from "react";
import { MenuPopupProps, MenuPopupStates } from "./interface";
import NotePopup from "../popup-notes";
import TranslatePopup from "../popup-translate";
import "./style.css";

class MenuPopup extends React.Component<MenuPopupProps, MenuPopupStates> {
  constructor(props: MenuPopupProps) {
    super(props);
    this.state = {
      isOpenMenu: false,
      text: "",
      noteRect: null,
      pageWidth: "",
      pageHeight: "",
      pageX: 0,
      pageY: 0,
    };
  }

  componentDidMount() {
    const viewer = document.querySelector(".ebook-viewer");
    if (viewer) viewer.setAttribute("style", "height:100vh;overflow-y:hidden");
    let pageArea = document.getElementById("page-area");
    if (!pageArea) return;
    let iframe = pageArea.getElementsByTagName("iframe")[0];
    if (!iframe) return;
    iframe.onload = () => {
      let doc: any;
      if (iframe.contentWindow !== null) doc = iframe.contentWindow;
      doc.document.addEventListener("click", (event: any) => {
        event.preventDefault();
      });
      doc.document.addEventListener("mouseup", (e) => {
        if (this.props.readMode === 0) return;
        if (!doc!.getSelection()) return;
        var noteRect = doc!
          .getSelection()!
          .getRangeAt(0)
          .getBoundingClientRect();
        var text = doc!.getSelection().toString();
        if (text === "") this.setState({ isOpenMenu: false });
        else
          this.setState({
            isOpenMenu: true,
            text,
            noteRect,
            pageWidth: doc.document.body.scrollWidth,
            pageHeight: doc.document.body.scrollHeight,
            pageX: e.pageX,
            pageY: e.pageY,
          });
      });
    };
  }

  openMenu = () => {
    let pageArea = document.getElementById("page-area");
    if (!pageArea) return;
    let iframe = pageArea.getElementsByTagName("iframe")[0];
    if (!iframe) return;
    let doc = iframe.contentDocument;
    if (!doc) return;
    let sel = doc.getSelection();
  };

  closePopupMenu = () => {
    this.setState({
      isOpenMenu: false,
      text: "",
    });
  };

  render() {
    return (
      <>
        {this.props.readMode !== 0 && (
          <div
            className="pop-up-menu-container"
            onMouseLeave={this.closePopupMenu}
            style={{
              display: this.state.isOpenMenu ? "" : "none",
              left: this.state.pageX + "px",
              top: this.state.pageY + "px",
              transform: "translate(-125px, -62px)",
            }}
          >
            <div className="pop-up-menu-content">
              {this.props.readMode === 1 && this.state.text && (
                <TranslatePopup
                  text={this.state.text}
                  closeMenu={this.closePopupMenu}
                />
              )}
              {this.props.readMode === 2 && (
                <NotePopup
                  text={this.state.text}
                  rect={this.state.noteRect}
                  closeMenu={this.closePopupMenu}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MenuPopup;
