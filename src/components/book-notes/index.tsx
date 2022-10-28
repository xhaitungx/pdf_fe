import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Note from "../../model/Note";
import "./style.css";

const BookNotes = ({noteList}) => {

  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  })

  return (
    <div className="book-note">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2 className="book-note-label">
            {noteList.bookName}
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="book-note-list">
            {}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BookNotes;
