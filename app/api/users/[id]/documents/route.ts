import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const {id} = params;
    const result = await dbQuery({
        sql: "SELECT * FROM documents WHERE document_author_id =? OR document_private =false",
        values: [id],
    });
    return NextResponse.json(result);
}