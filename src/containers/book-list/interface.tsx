import BookModel from "../../model/Book";

export interface BookListProps {
  books: BookModel[];
  handleFetchBooks: (payload: BookModel[] | null) => void;
}

export interface BookListStates {
  searchInput: string;
  bookListMenu: boolean;
  alertType: string;
  openSnackbar: boolean;
}
