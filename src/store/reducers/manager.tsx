const initState = {
  books: null,
  deletedBooks: null,
  notes: null,
  vocabularies: null,
  message: "Add Successfully",
};
export function manager(
  state = initState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "HANDLE_FETCH_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "HANDLE_FETCH_DELETED_BOOKS":
      return {
        ...state,
        deletedBooks: action.payload,
      };
    case "HANDLE_FETCH_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "HANDLE_FETCH_VOCABULARIES":
      return {
        ...state,
        vocabularies: action.payload,
      };
    case "HANDLE_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
