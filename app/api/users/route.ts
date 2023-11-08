import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { email, userName } = await req.json();

    const existingUser = await dbQuery({
      sql: "SELECT * FROM users WHERE user_email = (?)",
      values: [email],
    });

    if (Array.isArray(existingUser) && existingUser.length === 0) {
      await dbQuery({
        sql: "INSERT INTO users (user_email, user_name) VALUES (?, ?)",
        values: [email, userName],
      });
      const newUser = await dbQuery({
        sql: "SELECT * FROM users WHERE user_email = (?)",
        values: [email],
      });
      return NextResponse.json(newUser);
    }

    return NextResponse.json(existingUser);
  } catch (error) {
    return NextResponse.error();
  }
}
