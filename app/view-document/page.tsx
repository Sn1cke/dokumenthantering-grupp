"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Document } from "@/interfaces";
import { getUser } from "@/utils/utils";

export default function CreateDocument() {
  const router = useRouter();
  const [documentData, setDocumentData] = useState<Document | undefined>(
    undefined
  );

  const searchParams = useSearchParams();
  const documentID = searchParams.get("id");
  const user = getUser();
  useEffect(() => {
    const getDocument = async () => {
      const res = await fetch(`documents/${documentID}`);
      const data = await res.json();
      setDocumentData(data[0]);
    };
    if (documentID) getDocument();
  }, [documentID]);

  const renderHTML = (htmlString: string | undefined) => {
    return { __html: htmlString || "" };
  };

  const confirmDelete = async () => {
    const res = await fetch(`documents/${documentID}`, {
      method: "DELETE",
    });
    router.push("/documents");
  };

  const handleEdit = () => {
    router.push("/edit-document/?id=" + documentID);
  };

  const modalDelete = (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl">Deleting document</h3>
        <p className="py-4">
          Are you sure you wish to delete{" "}
          <span className="font-semibold">{documentData?.document_title}</span>?
        </p>
        <div className="text-center">
          <form method="dialog">
            <button
              onClick={() => confirmDelete()}
              className="btn btn-accent text-white"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );

  const formatDate = (date: string | number | Date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('sv-SE');
  };

  return (
    <div className="container mx-auto p-4 mb-16 mt-8">
      {documentData ? (
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {documentData?.document_title}
          </h2>
          <div className="flex pb-6 pt-2 text-xs"
          >Last edited: {formatDate(documentData?.document_edited)}
          </div>
          <div
            className="flex flex-col"
            dangerouslySetInnerHTML={renderHTML(documentData?.document_HTML)}
          />
          {documentData.document_author_id === user.user_id ? (
            <div className="flex gap-4 justify-end mt-4">
              <button
                className="btn btn-accent text-white self-end mt-3"
                onClick={() => {
                  const modal = document?.getElementById(
                    "my_modal_3"
                  ) as HTMLDialogElement | null;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                Delete
              </button>
              {modalDelete}
              <button
                onClick={() => handleEdit()}
                className="btn btn-secondary self-end mt-3"
              >
                Edit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="mx-auto flex justify-center py-4 gap-4">
          <span className="loading loading-spinner loading-md"></span>{" "}
          <span>Loading document...</span>
        </div>
      )}
    </div>
  );
}
