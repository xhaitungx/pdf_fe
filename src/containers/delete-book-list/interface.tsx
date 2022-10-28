import BookModel from "../../model/Book";

export interface DeletedBookListProps {
  deletedBooks: BookModel[];
  handleFetchDeletedBooks: (payload: BookModel[] | null) => void;
}

export interface DeletedBookListStates {
  alertType: string;
  openSnackbar: boolean;
}
