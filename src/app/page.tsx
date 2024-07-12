import Link from "next/link";
import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });
  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl2 font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded bg-blue-200">
          New Snippet
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderSnippets}</div>
    </div>
  );
}
