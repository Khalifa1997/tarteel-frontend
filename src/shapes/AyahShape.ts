import WordShape from './WordShape';
import TranslationShape from './TranslationShape';

interface AyahShape {
  verseNumber: number;
  chapterId: number;
  words: Array<WordShape>;
  textMadani: string;
  textSimple: string;
  sajdah?: boolean;
  translations?: Array<TranslationShape>;
  hash: number;
  sessionId: string;
  [key: string]: any;
}

export default AyahShape;
