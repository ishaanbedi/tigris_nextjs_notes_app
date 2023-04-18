import { Tigris } from "@tigrisdata/core";
import { Note } from "./db/model";
async function main() {
  const tigrisClient = new Tigris();
  await tigrisClient.getDatabase().initializeBranch();
  await tigrisClient.registerSchemas([Note]);
}
main()
  .then(async () => {
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
