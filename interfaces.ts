export interface Document {
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
  name: string;
  email: string;
  password: string;
}
