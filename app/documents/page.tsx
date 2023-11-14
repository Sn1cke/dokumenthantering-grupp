"use client";
import Link from "next/link";
import { Document, User } from "@/interfaces";
import { HiDocumentText } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Star from "@/components/Star";
import { getUser } from "@/utils/utils";

/*
steg 1, hämta alla dok som redan finns i DB


  fetcha mot API

  querrya alla dok där user_id stämmer osv
  querrya alla favo där user id stämmer
  mappa  över alla dokument 
    mappa favo mot nuvarande dok
    om dok_id === favo dok id sätt propp isFavo = true

  returnera dok med korrekta favo propp

  sortera dok på kategorier
  sortera kategori på favo

steg 2 uppdatera favoritmarkering

är det rätt att skippa fetchen?

  uppdatera prop för det dokumentet(och därmed state), skicka POST/DELETE till api

*/

export default function DocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);

  const categoryColors: string[] = ["#2ecc71", "#e74c3c", "#f39c12", "#f1c40f"];

  const viewDocument = (document: Document) => {
    router.push("/view-document/?id=" + document.document_id);
  };

  useEffect(() => {
    const createNewUser = async () => {
      const result = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          userName: session?.user?.name,
        }),
      });
      if (result.ok) {
        const newUser = await result.json();

        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id: newUser[0].user_id,
            user_email: newUser[0].user_email,
            user_name: newUser[0].user_name,
          })
        );
        setUser(newUser);
      }
    };

    const getDocumentsData = async () => {
      const user = getUser();
      const result = await fetch("/api/users/" + user.user_id + "/documents");
      const documentsFromAPI = await result.json();
      setDocuments(documentsFromAPI.reverse());
    };
    createNewUser().then(() => getDocumentsData());
  }, [session?.user]);

  // sortera efter favourite
  const sortDocuments = (documents: Document[]) => {
    return documents.sort((a, b) => {
      if (a.document_favourited && !b.document_favourited) {
        return -1; // a comes first
      }
      if (!a.document_favourited && b.document_favourited) {
        return 1; // b comes first
      }
      return 0; // no change
    });
  };

  useEffect(() => {
    let filtered;
    if (selectedCategory === "all") {
      filtered = documents;
    } else if (selectedCategory === "uncategorized") {
      filtered = documents.filter(
        document => document.document_category_id === null
      );
    } else {
      filtered = documents.filter(
        (document: { document_category_id: number }) =>
          document.document_category_id === parseInt(selectedCategory)
      );
    }
    const sortedDocuments = sortDocuments(filtered);
    setFilteredDocuments(sortedDocuments);
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
            isStarred={document.document_favourited}
            updateStar={updateStar()}
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
