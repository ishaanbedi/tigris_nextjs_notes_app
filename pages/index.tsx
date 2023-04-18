import type { GetServerSideProps, NextPage } from "next";
import tigrisDB from "../lib/tigris";
import { Note } from "../db/model";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
type Props = {
  items: Array<Note>;
};
const Home: NextPage<Props> = ({ items }) => {
  const [notesList, setNotesList] = useState<Array<Note>>(items);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetchListItems = () => {
    try {
      fetch("/api/crudHandler")
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setNotesList(data.result);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>Tigris + Next.js Notes</title>
        <meta name="description" content="Tigris + Next.js Notes" />
      </Head>
      <div className="flex flex-col items-center h-screen bg-gray-100">
        <header className="text-2xl font-bold pt-4">
          Tigris + Next.js Notes App
        </header>
        <main className=" max-w-3xl mt-8 bg-white shadow-md rounded-md p-6 w-full m-2">
          {notesList.length > 0 ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Notes List
              </h1>
              <div className="mb-4">
                {notesList.length > 0 && (
                  <input
                    type="text"
                    placeholder="Filter notes by title..."
                    className="border border-gray-300 rounded-md p-2 w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </div>
              <ul className="divide-y divide-gray-200">
                {notesList
                  .filter((item) =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <Link href={`/note/${item.id}`} key={item.id}>
                      <li className="py-4 hover:bg-gray-100 cursor-pointer p-3">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {index + 1}. {item.title}
                        </h3>
                        <p className="text-gray-500">
                          {item.body.length > 75
                            ? item.body.substring(0, 75) + "..."
                            : item.body}
                        </p>
                      </li>
                    </Link>
                  ))}
              </ul>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                No notes in the database yet :(
              </h1>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                <Link href="/new-note">Add a new note</Link>
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const itemsCollection = tigrisDB.getCollection<Note>(Note);
  const cursor = itemsCollection.findMany();
  const items = await cursor.toArray();
  return {
    props: { items },
  };
};
export default Home;
