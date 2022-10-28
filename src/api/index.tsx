import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5004",
});

export const BookApi = async (type, bookId = "", payload = {}) => {
  const userId = window.localStorage.getItem("userId");
  const body = {
    userId: userId,
    bookId: bookId,
    payload: payload,
  };
  if (userId)
    switch (type) {
      case "addBooks":
        return await Axios.post("/book", body).then(({ data }) => data);
      case "getBooksList":
        return await Axios.post("/book/books-list", body).then((res) => res);
      case "getDeletedBooksList":
        return await Axios.post("/book/deleted-books-list", body).then(
          (res) => res
        );
      case "getBook":
        return await Axios.post("/book/book-detail", body).then(
          ({ data }) => data
        );
      case "updateBook":
        return await Axios.patch("/book", body).then(({ data }) => data);
      case "restoreBook":
        return await Axios.patch("/book/restore", body as any).then((res) => res);
      case "softDeleteBook":
        return await Axios.patch("/book/soft-deleting", body).then((res) => res);
      case "hardDeleteBook":
        return await Axios.patch("/book/hard-deleting", body).then((res) => res);
    }
};

export const VocabulariesApi = async (type, payload = {}) => {
  const userId = window.localStorage.getItem("userId");
  const bookId = window.location.search.split("=").reverse()[0];
  const body = {
    userId: userId,
    bookId: bookId,
    payload: payload,
  };
  if (userId)
    switch (type) {
      case "addVocabulary":
        return await Axios.post("/vocabulary", body).then(({ data }) => data);
      case "getVocabularies":
        return await Axios.post("/vocabulary/vocabulary-list", body).then(
          ({ data }) => data
        );
    }
};

export const NoteApi = async (type, payload = {}) => {
  const userId = window.localStorage.getItem("userId");
  const bookId = window.location.search.split("=").reverse()[0];
  const body = {
    userId: userId,
    bookId: bookId,
    payload: payload,
  };
  if (userId)
    switch (type) {
      case "addNote":
        return await Axios.post("/note", body).then((res) => res);
      case "getBookNotes":
        return await Axios.post("/note/book-notes", body).then((res) => res);
      case "getNotes":
        return await Axios.post("/note/notes-list", body).then((res) => res);
    }
};

export const UserApi = async (type, payload) => {
  const userId = window.localStorage.getItem("userId");
  const body = {
    userId: userId,
    payload: payload,
  };
    switch (type) {
      case "register":
        return await Axios.post("/user/register", body).then((res) => res);
      case "login":
        return await Axios.post("/user/login", body.payload).then(
          (res) => res
        );
    }
};
