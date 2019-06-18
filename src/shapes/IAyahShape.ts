import TranslationShape from './TranslationShape';
import WordShape from './WordShape';

interface IAyahShape {
  verseNumber: number;
  chapterId: number;
  words: WordShape[];
  textMadani: string;
  textSimple: string;
  sajdah?: boolean;
  translations?: TranslationShape[];
  hash: number;
  sessionId: string;
  [key: string]: any;
}

export default IAyahShape;
