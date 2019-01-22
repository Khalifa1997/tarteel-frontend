
interface TranslationShape {
  id: number;
  languageName?: string;
  text: string;
  resourceName?: string | null;
  resourceId: number;
  authorName?: string;
}

export default TranslationShape;
