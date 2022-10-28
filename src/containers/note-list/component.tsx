import React from "react";
import { NoteListProps, NoteListStates } from "./interface";
import { NoteApi } from "../../api";
import "./style.css";
import Loading from "../../components/loading";
import {Link} from "react-router-dom";
import {Accordion,
  AccordionSummary,
  AccordionDetails} from "@mui/material";
import localforage from "localforage";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Note from "../../model/Note";
class NoteList extends React.Component<NoteListProps, NoteListStates> {
  constructor(props: NoteListProps) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.notes) {
      const res = await NoteApi("getNotes");
      if (res && res.status === 200) {
        this.props.handleFetchNotes(res.data.notes);
      }
    }
  }

  renderNoteBookNoteToggle(noteList: Note) {
    return (
      <div className="book-note" key={noteList._id}>
         <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2 className="book-note-label">
          {noteList.bookName}
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="book-note-list">
        {noteList.list.map((note) => (
          <Link key={note._id} to={`/pdf-reader?bookId=${noteList.bookId}`} onClick={(e)=>{console.log(note.cfi); localStorage.setItem("cfi", note.cfi )}}>
          <div id={note._id} className="note">
            <div className="">
            <small className="note-text"><i>{note.text}</i></small>
            </div>
            <span className="note-content">{note.note}</span>
          </div>
          </Link>
        ))}
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
    );
  }

  render() {
    return (
      <>
        {!this.props.notes && <Loading />}
        {this.props.notes && this.props.notes.length > 0 && (
          <div className="container note-list-container">
            {this.props.notes
              .filter((noteList) => noteList.list.length > 0)
              .map((noteList) => this.renderNoteBookNoteToggle(noteList))}
          </div>
        )}
        {this.props.notes && this.props.notes.length === 0 && (
          <h1 className="empty-text">Chưa có note mới được thêm</h1>
        )}
      </>
    );
  }
}

export default NoteList;
