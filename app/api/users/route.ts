import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { email, userName } = await req.json();

    await dbQuery({
      sql: "INSERT INTO users (user_email, user_name) VALUES (?, ?)",
      values: [email, userName]
    });
    const newUser = await dbQuery({
      sql: "SELECT * FROM users WHERE user_email = (?)",
      values: [email]
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;

  const result = await dbQuery({
    sql: "SELECT * FROM users WHERE user_id = ?",
    values: [user_id]
  });

  return NextResponse.json(result, { status: 200 });
}
