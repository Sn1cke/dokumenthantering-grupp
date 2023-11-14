import { Favourite, Document } from "@/interfaces";
import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const documents = await dbQuery({
    sql: `
      SELECT documents.*, users.user_name AS document_author
      FROM documents
      JOIN users ON documents.document_author_id = users.user_id
      WHERE (documents.document_author_id = ? OR documents.document_private = false)
      AND documents.document_deleted = false
    `,
    values: [id],
  });

  const favourites = await dbQuery({
    sql: `
      SELECT * FROM favourites where user_id = ?
    `,
    values: [id],
  });

  const favos = favourites as Favourite[];
  const docs = documents as Document[];
  docs.map(doc => {
    favos.map(favo => {
      if (favo.document_id === doc.document_id) {
        doc.document_favourited = true;
      } else {
        doc.document_favourited = false;
      }
    });
  });
  console.log(documents);
  return NextResponse.json(documents);
}
