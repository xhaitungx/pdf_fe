const initState = {
  selection: null,
  bookNotes: null,
  isChangeDirection: false,
  isShowBookmark: false,
  readMode: 0,
};
export function viewArea(
  state = initState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "HANDLE_OPEN_HIGHLIGHT":
      return {
        ...state,
        isOpenHighlight: action.payload,
      };
    case "HANDLE_FETCH_BOOK_NOTES":
      return {
        ...state,
        bookNotes: action.payload,
      };

    case "HANDLE_SHOW_BOOKMARK":
      return {
        ...state,
        isShowBookmark: action.payload,
      };
    case "HANDLE_SELECTION":
      return {
        ...state,
        selection: action.payload,
      };
    case "HANDLE_DIALOG_LOCATION":
      return {
        ...state,
        dialogLocation: action.payload,
      };
    case "HANDLE_MENU_MODE":
      return {
        ...state,
        menuMode: action.payload,
      };
    case "HANDLE_CHANGE_DIRECTION":
      return {
        ...state,
        isChangeDirection: action.payload,
      };
    case "HANDLE_CHANGE_READ_MODE":
      return {
        ...state,
        readMode: action.payload,
      };
    default:
      return state;
  }
}
