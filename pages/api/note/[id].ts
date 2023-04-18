import { NextApiRequest, NextApiResponse } from "next";
import tigrisDB from "../../../lib/tigris";
import { Note } from "../../../db/model";
import NextCors from "nextjs-cors";
type Data = {
  result?: Note;
  error?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      await handleGet(req, res, Number(id));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  itemId: number
) {
  try {
    const itemsCollection = tigrisDB.getCollection<Note>(Note);
    const item = await itemsCollection.findOne({
      filter: { id: itemId },
    });
    if (!item) {
      res.status(404).json({ error: "No item found" });
    } else {
      res.status(200).json({ result: item });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
}
