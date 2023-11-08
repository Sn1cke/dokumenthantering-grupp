import { ReactNode } from "react";

export interface Document {
  document_author_id: ReactNode;
  document_content: string;
  document_created: string | number | Date;
  document_id: number;
  document_author: ReactNode;
  id: number;
  title: string;
  content: string;
  author: string;
  dateCreated: string;
  textStyling: string;
}

export interface QuillContent {
  quillText: string;
  quillInnerHTML: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
