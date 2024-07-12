import { notFound } from "next/navigation";
import { db } from "@/db";
import SnippetEditForm from "@/components/snippet-edit-form";
import Link from "next/link";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}
export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);

  const snippet = await db.snippet.findFirst({
    where: { id },
  });
  if (!snippet) return notFound();

  return (
    <div>
      <div className="mb-5">
        <Link href={"/"} className="p-2 border rounded bg-blue-50 ">
          Home
        </Link>
      </div>

      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
