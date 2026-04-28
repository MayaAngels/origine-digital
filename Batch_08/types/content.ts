export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  isActive: boolean;
  sortOrder?: number | null;
}

export interface ContentBlock {
  id: string;
  key: string;
  title?: string | null;
  body?: string | null;
  type?: string | null;
  isActive: boolean;
}