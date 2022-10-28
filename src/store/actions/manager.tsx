import BookModel from "../../model/Book";
import VocabularyModel from "../../model/Vocabulary";
import NoteModel from "../../model/Note";

export function handleFetchBooks(books: BookModel[] | null) {
  return { type: "HANDLE_FETCH_BOOKS", payload: books };
}

export function handleFetchDeletedBooks(deletedBooks: BookModel[] | null) {
  return { type: "HANDLE_FETCH_DELETED_BOOKS", payload: deletedBooks };
}

export function handleFetchNotes(notes: NoteModel[] | null) {
  return { type: "HANDLE_FETCH_NOTES", payload: notes };
}

export function handleFetchVocabularies(vocabularies: VocabularyModel[]) {
  return { type: "HANDLE_FETCH_VOCABULARIES", payload: vocabularies };
}

export function handleLoading(isLoading: Boolean) {
  return { type: "HANDLE_LOADING", payload: isLoading };
}
