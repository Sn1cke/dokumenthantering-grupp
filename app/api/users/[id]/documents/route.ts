import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql: `
      SELECT documents.*, users.user_name AS document_author
      FROM documents
      JOIN users ON documents.document_author_id = users.user_id
      WHERE documents.document_author_id = ? OR documents.document_private = false
    `,
    values: [id],
  });
  return NextResponse.json(result);
}
