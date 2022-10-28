class Vocabulary {
  _id: string;
  bookId: string;
  bookName: string;
  list: IVocabulary[];
  constructor(
    id: string,
    bookId: string,
    bookName: string,
    list: IVocabulary[]
  ) {
    this._id = id;
    this.bookId = bookId;
    this.bookName = bookName;
    this.list = list;
  }
}

interface IVocabulary {
  text: string;
  meaning: string;
}

export default Vocabulary;
