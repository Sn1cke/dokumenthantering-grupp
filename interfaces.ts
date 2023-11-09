import { ReactNode } from "react";

export interface Document {
  document_id: number;
  document_title: string;
  document_content: string;
  document_author_id: ReactNode;
  document_author: ReactNode; //*
  document_created: string | Date;
  document_edited: string | Date;
  document_HTML: string;
  document_private: boolean;
  document_deleted: boolean;
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
