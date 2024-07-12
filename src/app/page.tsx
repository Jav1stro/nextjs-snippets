import { db } from "@/app/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id}>
        <b> {snippet.title}</b>
        <p>{snippet.code}</p>
      </div>
    );
  });
  return <div>{renderSnippets}</div>;
}
