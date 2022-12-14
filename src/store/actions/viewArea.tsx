import NoteModel from "../../model/Note";

export function handleChangeReadMode(readMode: number) {
  return { type: "HANDLE_CHANGE_READ_MODE", payload: readMode };
}

export function handleFetchBookNotes(bookNotes: NoteModel | null) {
  return { type: "HANDLE_FETCH_BOOK_NOTES", payload: bookNotes };
}

export function handleOpenMenu(isOpenMenu: boolean) {
  return { type: "HANDLE_OPEN_MENU", payload: isOpenMenu };
}
export function handleMenuMode(menuMode: string) {
  return { type: "HANDLE_MENU_MODE", payload: menuMode };
}
export function handleOpenHighlight(isOpenHighlight: boolean) {
  return { type: "HANDLE_OPEN_HIGHLIGHT", payload: isOpenHighlight };
}
export function handleChangeDirection(isChangeDirection: boolean) {
  return { type: "HANDLE_CHANGE_DIRECTION", payload: isChangeDirection };
}
export function handleShowBookmark(isShowBookmark: boolean) {
  return { type: "HANDLE_SHOW_BOOKMARK", payload: isShowBookmark };
}
export function handleSelection(selection: string) {
  return { type: "HANDLE_SELECTION", payload: selection };
}
