"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string, title: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
      title,
    },
  });
  console.log("snippet edited correctly.");

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  console.log("snippet removed correctly.");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3)
      return { message: "Title must be longer." };

    if (typeof code !== "string" || code.length < 10)
      return { message: "Code must be longer." };

    // Create a new record in the database
    let snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log("Snippet created!!", snippet);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong.",
      };
    }
  }
  // Redirect the user back to the root route
  redirect("/");
}
