class Note {
  _id: string;
  bookId: string;
  bookName: string;
  list: INote[];
  constructor(
    _id: string,
    bookId: string,
    bookName: string,
    list: INote[]
  ) {
    this._id = _id;
    this.bookId = bookId;
    this.bookName = bookName;
    this.list = list;
  }
}

interface INote {
  _id: string;
  text: string;
  note: string;
  color: string;
  cfi: string;
  range: string;
}

export default Note;
