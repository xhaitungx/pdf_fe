import NoteModel from "../../model/Note";
export interface NoteListProps {
  notes: NoteModel[];
  handleFetchNotes: (notes: NoteModel[] | null) => void;
}

export interface NoteListStates {
  characterCategory: string;
}
