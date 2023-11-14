import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql: `
    SELECT documents.*, users.user_name as document_author
    FROM documents
    INNER JOIN users ON documents.document_author_id = users.user_id
    WHERE documents.document_id = ${parseInt(id)}
  `,
    values: [],
  });
  return NextResponse.json(result);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { document_title, document_content, document_HTML, document_edited } =
    await req.json();

  const result = await dbQuery({
    sql:
      "UPDATE documents SET document_title=?, document_content=?, document_HTML=?, document_edited=? WHERE document_id=" +
      parseInt(id),
    values: [document_title, document_content, document_HTML, document_edited],
  });
  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql:
      "UPDATE documents SET document_deleted=1 WHERE document_id=" +
      parseInt(id),
    values: [],
  });
  return NextResponse.json(result);
}
