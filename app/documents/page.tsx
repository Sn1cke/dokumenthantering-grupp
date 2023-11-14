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
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);

  const categoryColors: string[] = ["#2ecc71", "#e74c3c", "#f39c12", "#f1c40f"];

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
        if (userData.message) {
          return
        }
        const newUser: User = userData[0]
        setUser(newUser)
        fetch(`api/users/${newUser.user_id}/documents`)
          .then(res => res.json())
          .then(docData => {
            docData.reverse()
            setDocuments(docData)
          })
      })
  }, [session?.user])

  useEffect(() => {
    const filteredDocuments =
      selectedCategory === "all"
        ? documents
        : selectedCategory === "uncategorized"
          ? documents.filter(document => document.document_category_id === null)
          : documents.filter(
            (document: { document_category_id: number }) =>
              document.document_category_id === parseInt(selectedCategory)
          );
    setFilteredDocuments(filteredDocuments);
  }, [documents, selectedCategory]);

  const documentsData = filteredDocuments.map((document: Document) => {
    const truncatedContent =
      document.document_content.length > 25
        ? `${document.document_content.substring(0, 35)}...`
        : document.document_content;

    const formattedDate = format(
      new Date(document.document_created),
      "yyyy-MM-dd"
    );

    const categoryColor =
      categoryColors[document.document_category_id - 1] || "007EBD";

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
          <HiDocumentText
            className={`h-8 w-8`}
            style={{ color: categoryColor }}
          />
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
        <select
          className="select select-bordered w-full max-w-[240px] mt-4"
          value={selectedCategory}
          onChange={e => {
            setSelectedCategory(e.target.value);
          }}
        >
          <option value="all">All categories</option>
          <option value="uncategorized">Uncategorized</option>
          <option value="1">Human Resources</option>
          <option value="2">Financial Documents</option>
          <option value="3">Project Management</option>
          <option value="4">Sales and Marketing</option>
        </select>
        {documents ? (
          <div className="overflow-x-auto mt-2">
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
