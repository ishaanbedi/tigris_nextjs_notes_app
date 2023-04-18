import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Note } from "../db/model";
import toast from "react-hot-toast";

type Props = {
  items: Array<Note>;
};

const NewPage: NextPage<Props> = () => {
  const notifySuccess = () => {
    toast.dismiss();
    toast.success("Note uploaded successfully");
  };
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError("");
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setBodyError("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      setTitleError("Title is required");
    }
    if (!body) {
      setBodyError("Note is required");
    }
    if (!title || !body) {
      return;
    }
    toast.loading("Uploading to database...");
    setIsLoading(true);
    fetch("/api/crudHandler", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then(() => {
        setTitle("");
        setBody("");
        notifySuccess();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <Head>
        <title>New Note | Tigris + Next.js Notes Taking App</title>
        <meta name="description" content="Tigris + Next.js Notes Taking App" />
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <main className="py-10 px-3">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase py-4">
                Add a new note
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  className={`border rounded-lg px-3 py-2 w-full ${
                    titleError ? "border-red-500" : ""
                  }`}
                />
                {titleError && (
                  <p className="text-red-500 text-sm mt-1">{titleError}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Note
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={handleBodyChange}
                  className={`border rounded-lg px-3 py-2 w-full h-64 ${
                    bodyError ? "border-red-500" : ""
                  }`}
                ></textarea>
                {bodyError && (
                  <p className="text-red-500 text-sm mt-1">{bodyError}</p>
                )}
              </div>
              <button
                type="submit"
                className={`bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Saving Note..." : "Save Note"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewPage;
