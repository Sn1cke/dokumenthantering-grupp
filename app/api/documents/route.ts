import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const result = await dbQuery({
    sql: "SELECT * FROM documents",
    values: [],
  });
  return NextResponse.json(result);
}

export async function POST(req: Request, res: Response) {
  try {
    const { title, content, author, dateCreated, textStyling } =
      await req.json();

    const result = await dbQuery({
      sql: "INSERT INTO documents (title, content, author, dateCreated, textStyling) VALUES (?, ?, ?, ?, ?)",
      values: [title, content, author, dateCreated, textStyling],
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}
