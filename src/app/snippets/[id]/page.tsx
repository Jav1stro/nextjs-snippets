import { notFound } from "next/navigation";
import { db } from "@/app/db";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });
  if (!snippet) return notFound();
  return (
    <div>
      <h1 className="text-xl">I found the snippet with id {snippet.id}.</h1>
      <p>{snippet.title}:</p>
      <p>{snippet.code}</p>
    </div>
  );
}
