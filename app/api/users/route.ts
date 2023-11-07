import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { email, userName } = await req.json();

    const existingUser = await dbQuery({
      sql: "SELECT * FROM users WHERE user_email = (?)",
      values: [email],
    });

    console.log("CLG", existingUser);

    if (Array.isArray(existingUser) && existingUser.length === 0) {
      const result = await dbQuery({
        sql: "INSERT INTO users (user_email, user_name) VALUES (?, ?)",
        values: [email, userName],
      });
    }

    return NextResponse.json(existingUser);
  } catch (error) {
    return NextResponse.error();
  }
}
