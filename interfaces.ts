export interface Document {
  document_id: number;
  document_title: string;
  document_content: string;
  document_author_id: string;
  document_category_id: string;
  document_created: string;
  document_edited: string;
  document_HTML: string;
  document_private: string;
  document_deleted: string;
}

export interface QuillContent {
  quillText: string;
  quillInnerHTML: string;
}

export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
}

export interface Favourite {
  favourite_id: number;
  user_id: number;
  document_id: number;
}
