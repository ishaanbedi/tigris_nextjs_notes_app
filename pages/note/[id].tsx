import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
const NotePage = ({
  data,
}: {
  data: { result: { id: string; title: string; body: string } };
}) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(data.result.title);
  const [updatedBody, setUpdatedBody] = useState(data.result.body);
  const [loading, setLoading] = useState(false);
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleUpdate = async () => {
    if (
      updatedTitle === data.result.title &&
      updatedBody === data.result.body
    ) {
      toast.error("No changes made.");
      return;
    }
    toast.loading("Updating note...");
    setLoading(true);
    try {
      const reqf = await axios.put(
        `/api/crudHandler?id=${data.result.id}&title=${updatedTitle}&body=${updatedBody}`
      );
      if (reqf.status === 200) {
        router.reload();
        toast.dismiss();
        toast.success("Note updated successfully");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("There was an error updating the note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting note...");
    setLoading(true);
    try {
      const reqf = await axios.delete(
        `/api/crudHandler?id=${data.result.id}&title=${updatedTitle}&body=${updatedBody}`
      );
      if (reqf.status === 200) {
        router.push("/");
        toast.dismiss();
        toast.success("Note deleted successfully");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("There was an error deleting the note");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toast.remove();
    setUpdatedTitle(data.result.title);
    setUpdatedBody(data.result.body);
    setEditMode(false);
  };
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Head>
        <title>{data.result.title} | Tigris + Next.js Notes Taking App</title>
      </Head>
      <div className="flex justify-between items-center mb-4">
        {editMode ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border border-gray-400 rounded px-2 py-1"
            placeholder="Title here..."
          />
        ) : (
          <h1 className="text-2xl font-bold">{data.result.title}</h1>
        )}
        <div className="flex space-x-2">
          {editMode ? (
            <>
              <button
                className={`bg-cyan-500 ${
                  !loading && "hover:bg-cyan-600"
                } text-white px-4 py-2 rounded ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleUpdate}
                disabled={loading}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Cancel Updation
              </button>
            </>
          ) : (
            <button
              className={`bg-teal-500 ${
                !loading && "hover:bg-teal-600"
              } text-white px-4 py-2 rounded ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={handleEdit}
              disabled={loading}
            >
              Edit
            </button>
          )}
          {editMode ? null : (
            <button
              className={`bg-rose-500 ${
                !loading && "hover:bg-rose-600"
              } text-white px-4 py-2 rounded ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
      {editMode ? (
        <textarea
          value={updatedBody}
          onChange={(e) => setUpdatedBody(e.target.value)}
          className="border border-gray-400 rounded px-2 py-1 w-full h-72"
          placeholder="You are deleting the body of the note. Proceed with caution."
        />
      ) : (
        <p className="text-gray-700">{data.result.body}</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/note/${ctx.params?.id}`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

export default NotePage;
