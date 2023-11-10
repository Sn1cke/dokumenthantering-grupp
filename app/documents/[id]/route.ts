import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql: "SELECT * FROM documents where document_id=" + parseInt(id),
    values: [],
  });
  return NextResponse.json(result);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { document_title, document_content, document_HTML } = await req.json();

  console.log(document_title, document_content, document_HTML);

  const result = await dbQuery({
    sql:
      "UPDATE documents SET document_title=?, document_content=?, document_HTML=? WHERE document_id=" +
      parseInt(id),
    values: [document_title, document_content, document_HTML],
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
