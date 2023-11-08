import dbQuery from "@/lib/db";
import { NextResponse } from "next/server";


// export async function GET(req: Request, { params }: { params: { user_id: string } }) {
//     const { user_id } = params;
  
//     const result = await dbQuery({
//       sql: 'SELECT * FROM stars WHERE user_id = ?',
//       values: [user_id],
//     });
  
//     return NextResponse.json(result, { status: 200 });
//   }

  
  export async function POST(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    const { user_id, document_id } = await req.json();
  
    console.log('ID:', typeof id);
    console.log(typeof user_id, user_id);
    try {
  
    const result = await dbQuery({
      sql: "INSERT INTO favourites (user_id, document_id) VALUES (?, ?)",
      //sql: "INSERT INTO favourites (user_id, document_id) VALUES ((SELECT user_id FROM users WHERE user_id = ?), (SELECT document_id FROM documents WHERE document_id = ?))",
      values: [user_id, document_id],
      
    });
    return NextResponse.json(result, { status: 200 });
  } catch(error) {
      console.error("FEL:", error);

  }
    
  }


//   export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//     const { id } = params;
//     const { user_id, document_id } = await req.json();
  
//     console.log('ID:', id);
//     console.log('user_id:', user_id);
  
//     const result = await dbQuery({
//       sql: "DELETE FROM stars WHERE user_id = ? AND document_id = ?",
//       values: [user_id, document_id],
//     });
  
//     console.log('Result:', result);
//     return NextResponse.json(result, { status: 200 });
//   }