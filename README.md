# Tigris + Next.js Notes App

This is an example app to demonstrate crud operations using
[Next.js](https://nextjs.org/),
[Tigris TypeScript SDK](https://docs.tigrisdata.com/typescript/) & [Tailwind CSS](https://tailwindcss.com/).

Check out the project live at [tigris-nextjs-notes-app.vercel.app/](https://tigris-nextjs-notes-app.vercel.app/)

### Schema of the project:

The project is based on the following schema:

```json
{
  "title": "notes",
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "searchIndex": true
    },
    "body": {
      "type": "string"
    },
    "id": {
      "type": "integer",
      "format": "int32",
      "autoGenerate": true
    }
  },
  "primary_key": ["id"]
}
```

Refer to [db/model.ts](db/model.ts) to check the schema based on Tigris TypeScript SDK.

### Next.js API Route:

``` /api/crudHandler```

To handle all crud operations via one endpoint based on the request method (GET, POST, PUT, DELETE) for respective operations.

``` /api/note/[id]```

To handle GET, PUT, DELETE operations for a single note based on the id of the note.

### Deployment

Click on the button below to deploy the app on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fwww.github.com%2Fishaanbedi%2Ftigris_nextjs_notes_app&env=TIGRIS_URI,TIGRIS_PROJECT,TIGRIS_CLIENT_ID,TIGRIS_CLIENT_SECRET,TIGRIS_DB_BRANCH,NEXT_PUBLIC_SITE_URL&project-name=tigris-nextjs-notes-app&repository-name=tigris-nextjs-notes-app)

When prompted for environment variables, refer to the Application Keys section under your project's dashboard on Tigris.

### License

MIT License. Check out the [LICENSE file](LICENSE) for more details.

