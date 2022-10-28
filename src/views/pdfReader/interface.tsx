import NoteModel from "../../model/Note";
export interface ViewerProps {
  bookNotes: NoteModel | null;
  handleFetchBookNotes: (payload: NoteModel | null) => void;
}
export interface ViewerState {
  noteText: string;
  isOpenNote: boolean;
  isValidBook: boolean;
  loading: boolean;
  pageX: number;
  pageY: number;
}
