

interface WordShape {
  arabic?: string;
  verseKey: string;
  charType: string;
  className: string;
  code: string;
  lineNumber: number;
  pageNumber: number;
  position: number;
  wordId?: number;
  textMadani?: string | null;
  highlight?: string;
  audio: any;
  [key: string]: any;
}

export default WordShape;
