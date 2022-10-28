export interface note {
  cfi: string;
  chapter: string;
  chapterIndex: string;
  color: string;
  date: string;
  notes: string;
  percentage: number;
  range: string;
  tag: [];
  text: string;
}

export interface IBook {
  name: string;
  cover: string;
  md5?: string;
  content: ArrayBuffer;
  notes?: note[];
}
