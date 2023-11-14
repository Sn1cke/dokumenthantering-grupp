"use client";
import Link from "next/link";
import { Document, User } from "@/interfaces";
import { HiDocumentText } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Star from "@/components/Star";
import { setUser } from "@/utils/utils";

export default function DocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  const viewDocument = (document: Document) => {
    router.push("/view-document/?id=" + document.document_id);
  };
  useEffect(() => {
    fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        userName: session?.user?.name,
      }),
    })
      .then(res => res.json())
      .then(userData => {
        console.log(userData)
        if (userData.message) {
          return
        }
        const newUser: User = userData[0]
        setUser(newUser)
        console.log(newUser)
        fetch(`api/users/${newUser.user_id}/documents`)
          .then(res => res.json())
          .then(docData => {
            setDocuments(docData)
          })
      })


    // fetch("api/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: session?.user?.email,
    //     userName: session?.user?.name,
    //   }),
    // })
    //   .then(data => data.json())
    //   .then(res => {
    //     if (!res.message) {
    //     } else {
    //       setUser(res[0])
    //       fetch("/api/users/" + user?.id + "/documents")
    //         .then(docData => docData.json())
    //         .then(docs => console.log(docs))
    //     }

    //   })

    /*
      logga in med google -> skicka e-post till ny endpoint -> användare finns? -> returnera användaren -> spara användare i LS
    
      -> användare finns inte? -> skapa användare -> retyrbera användaren -> spara användare i LS
    */



  }, [])

  const documentsData = documents.map((document: Document) => {
    const truncatedContent =
      document.document_content.length > 25
        ? `${document.document_content.substring(0, 35)}...`
        : document.document_content;

    const formattedDate = format(
      new Date(document.document_created),
      "yyyy-MM-dd"
    );

    function addStar(documentId: number, userId: number): void {
      throw new Error("Function not implemented.");
    }

    function removeStar(documentId: number, userId: number): void {
      throw new Error("Function not implemented.");
    }

    return (
      <tr key={document.document_id}>
        <td
          onClick={() => viewDocument(document)}
          key={`document-${document.document_id}`}
          className="flex gap-2 items-center font-semibold hover:cursor-pointer"
        >
          <HiDocumentText className="h-8 w-8 text-secondary" />
          {document.document_title}
        </td>

        <td className="hidden md:table-cell">{truncatedContent}</td>
        <td className="hidden sm:table-cell font-medium">
          {document.document_author}
        </td>
        <td>{formattedDate}</td>
        <td>
          <Star
            documentId={document.document_id}
            userId={1}
            addStar={addStar}
            removeStar={removeStar}
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="container mx-auto p-4 mb-16 mt-8">
        <h2 className="text-2xl font-bold text-secondary">Documents</h2>
        {documents ? (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Title</th>
                  <th className="hidden md:table-cell">Preview</th>
                  <th className="hidden sm:table-cell">Author</th>
                  <th>Date created</th>
                </tr>
              </thead>
              <tbody>{documentsData}</tbody>
            </table>
          </div>
        ) : (
          <div className="mx-auto flex flex-col justify-center items-center py-4 gap-4 max-w-md">
            <span className="text-lg">
              There doesn`&apos;`t seem to be anything here!
            </span>
            <Link href="/create">
              <button className="btn btn-secondary">Get started</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}