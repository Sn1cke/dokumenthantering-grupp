"use client";
import { use, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { QuillContent, User } from "@/interfaces";
import { useRouter } from "next/navigation";
import { getFormattedDate } from "@/utils/utils";

export default function CreateDocument() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [isDocPrivate, setIsDocPrivate] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
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
  const placeholder = "Compose an epic...";
  const { quill, quillRef } = useQuill({ modules, formats, placeholder });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setDocTitle(event.target.value);
    }
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  const viewDocumentAfterCreate = () => {
    router.push("/documents");
  };
  useEffect(() => {}, [category]);
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setQuillContent({
          quillText: quill.getText().trim(),
          quillInnerHTML: quill.root.innerHTML,
        });
      });
    }
  }, [quill]);
  const handleSubmit = async (e: React.FormEvent) => {
    const storageUser = localStorage.getItem("user");
    const user: User = JSON.parse(storageUser as string);

    e.preventDefault();
    setIsLoading(true);
    await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: docTitle,
        content: quillContent.quillText,
        author: user.id,
        dateCreated: getFormattedDate(),
        textStyling: quillContent.quillInnerHTML,
        isPrivate: isDocPrivate,
        category: category,
        lastEdited: getFormattedDate(),
      }),
    });

    setTimeout(() => {
      if (quill) {
        quill.deleteText(0, quill.getLength());
      }
      setDocTitle("");
      setQuillContent({ quillText: "", quillInnerHTML: "" });
      setIsLoading(false);
      viewDocumentAfterCreate();
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 mb-16 mt-8">
      <div className="max-w-screen-lg mx-auto ">
        <h2 className="text-2xl font-bold text-secondary mb-2">
          Create document
        </h2>
        <form onSubmit={handleSubmit} className="min-h-[650px] flex flex-col">
          <input
            type="title"
            className="text pl-4 py-2 border border-[#ccc] w-full"
            placeholder="Title"
            value={docTitle}
            onChange={handleTitleChange}
          />
          <div className="flex-grow" ref={quillRef} />
          <div className="self-end mt-3 flex gap-4">
            <div className="btn-group btn-group-vertical">
              <input
                type="radio"
                name="options"
                data-title="Human Resources"
                className="btn"
                value="1"
                onChange={handleCategoryChange}
              />
              <input
                type="radio"
                name="options"
                data-title="Financial Documents"
                className="btn"
                value="2"
                onChange={handleCategoryChange}
              />
              <input
                type="radio"
                name="options"
                data-title="Project Management"
                className="btn"
                value="3"
                onChange={handleCategoryChange}
              />
              <input
                type="radio"
                name="options"
                data-title="Sales and Marketing"
                className="btn"
                value="4"
                onChange={handleCategoryChange}
              />
            </div>
            <div className=" self-center form-control">
              <label className="cursor-pointer label">
                <span className="label-text mr-4">Pivate document</span>
                <input
                  onChange={() => setIsDocPrivate(!isDocPrivate)}
                  type="checkbox"
                  checked={isDocPrivate}
                  className="checkbox checkbox-info"
                />
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn-secondary ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Adding" : "Add document"}
              {isLoading && (
                <span className="loading loading-dots loading-sm"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
