import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql: "SELECT * FROM documents where id=" + parseInt(id),
    values: [],
  });
  return NextResponse.json(result);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, content, textStyling } = await req.json();

  const result = await dbQuery({
    sql:
      "UPDATE documents SET title=?, content=?, textStyling=? WHERE id=" +
      parseInt(id),
    values: [title, content, textStyling],
  });
  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const result = await dbQuery({
    sql: "DELETE FROM documents where id=" + parseInt(id),
    values: [],
  });
  return NextResponse.json(result);
}
