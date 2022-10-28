import React from "react";
import BookList from "../containers/book-list";
import NoteList from "../containers/note-list";
import VocabularyList from "../containers/vocabulary-list";
import { Routes, Route } from "react-router-dom";
import DeleteBookList from "../containers/delete-book-list";
const ComponentRoutes = () => {
  return (
    <div style={{height:" 100%"}}>
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/notes" element={<NoteList />} />
      <Route path="/vocabularies" element={<VocabularyList />} />
      <Route path="/deletes" element={<DeleteBookList />} />
    </Routes>
    </div>
  );
};

export default ComponentRoutes;
