import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { manager } from "./reducers/manager";
import { reader } from "./reducers/reader";
import { viewArea } from "./reducers/viewArea";
import BookModel from "../model/Book";
import NoteModel from "../model/Note";
const rootReducer = combineReducers({
  manager,
  reader,
  viewArea,
});
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    (window as any).devToolsExtension
      ? (window as any).devToolsExtension()
      : (f: any) => f
  )
);
export default store;
export type stateType = {
  manager: {
    books: BookModel[];
    deletedBooks: BookModel[];
    notes: [];
    vocabularies: [];
    isLoading: Boolean;
  };
  reader: {
    notes: NoteModel[];
    digests: NoteModel[];
    color: number;
    chapters: any[];
    noteKey: string;
    currentChapter: string;
    currentChapterIndex: number;
    originalText: string;
  };
  viewArea: {
    selection: string;
    isChangeDirection: boolean;
    isShowBookmark: boolean;
    readMode: number;
    bookNotes: NoteModel | null;
  };
};
