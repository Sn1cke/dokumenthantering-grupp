import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const {
      title,
      content,
      author,
      category,
      dateCreated,
      textStyling,
      isPrivate,
      lastEdited,
    } = await req.json();

    const result = await dbQuery({
      sql: "INSERT INTO documents (document_title, document_content, document_created, document_author_id, document_category_id, document_HTML, document_private, document_edited, document_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        title,
        content,
        dateCreated,
        author,
        category,
        textStyling,
        isPrivate,
        lastEdited,
        false,
      ],
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Här blev det fel", error);
    return NextResponse.error();
  }
}
