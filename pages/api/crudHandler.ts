import type { NextApiRequest, NextApiResponse } from "next";
import { Note } from "../../db/model";
import tigrisDB from "../../lib/tigris";
import NextCors from "nextjs-cors";
type Response = {
  result?: Array<Note>;
  error?: string;
  deleted?: boolean;
  updated?: boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "POST":
      await handlePost(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
async function handleGet(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const itemsCollection = tigrisDB.getCollection<Note>(Note);
    const cursor = itemsCollection.findMany();
    const items = await cursor.toArray();
    res.status(200).json({ result: items });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
async function handlePost(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const item = JSON.parse(req.body) as Note;
    const itemsCollection = tigrisDB.getCollection<Note>(Note);
    const inserted = await itemsCollection.insertOne(item);
    res.status(200).json({ result: [inserted] });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
async function handlePut(req: NextApiRequest, res: NextApiResponse<Response>) {
  const query = req.query;
  const itemsCollection = tigrisDB.getCollection<Note>(Note);
  const updateResponse = await itemsCollection.updateOne({
    filter: { id: query.id },
    fields: {
      title: query.title,
      body: query.body,
    },
  });
  res.status(200).json({ updated: true });
}
async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const query = req.query;
  const itemsCollection = tigrisDB.getCollection<Note>(Note);
  const deleteResponse = await itemsCollection.deleteOne({
    filter: { id: query.id },
  });
  res.status(200).json({ deleted: true });
}
