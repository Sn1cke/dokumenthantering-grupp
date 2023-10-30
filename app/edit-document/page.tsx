"use client";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { QuillContent } from "@/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { Document } from "@/interfaces";

export default function CreateDocument() {
  const router = useRouter();
  const [documentData, setDocumentData] = useState<Document | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [quillContent, setQuillContent] = useState<QuillContent>({
    quillText: "",
    quillInnerHTML: "",
  });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "background",
    "color",
    "font",
    "size",
    "header",
  ];
  const { quill, quillRef } = useQuill({
    modules,
    formats,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setDocTitle(event.target.value);
    }
  };

  const searchParams = useSearchParams();
  const documentID = searchParams.get("id");
  const viewDocument = () => {
    router.push("/view-document/?id=" + documentID);
  };
  useEffect(() => {
    const getDocument = async () => {
      const res = await fetch(`documents/${documentID}`);
      const data = await res.json();
      setDocumentData(data[0]);
      setDocTitle(data[0].title);

      if (data[0] && quill) {
        quill.clipboard.dangerouslyPasteHTML(data[0].content);
      }
    };
    if (documentID) getDocument();
  }, [documentID]);

  useEffect(() => {
    if (quill && documentData) {
      quill.clipboard.dangerouslyPasteHTML(documentData.textStyling);

      quill.on("text-change", () => {
        setQuillContent({
          quillText: quill.getText().trim(),
          quillInnerHTML: quill.root.innerHTML,
        });
      });
    }
  }, [quill, documentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`documents/${documentID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: docTitle,
        content: quillContent.quillText,
        textStyling: quillContent.quillInnerHTML,
      }),
    });

    setTimeout(() => {
      setIsLoading(false);
      viewDocument();
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 mb-16 mt-8">
      <div className="max-w-screen-lg mx-auto ">
        <h2 className="text-2xl font-bold text-secondary mb-2">
          Editing document
        </h2>
        <div className="min-h-[650px] flex flex-col">
          <input
            type="title"
            className="text pl-4 py-2 border border-[#ccc] w-full"
            placeholder="Title"
            value={docTitle}
            onChange={handleChange}
          />
          <div className="flex-grow" ref={quillRef} />
          <div className="flex self-end mt-3 gap-4">
            <button
              className="btn btn-accent text-white"
              onClick={() => viewDocument()}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`btn btn-secondary ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving" : "Save"}
              {isLoading && (
                <span className="loading loading-dots loading-sm"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
