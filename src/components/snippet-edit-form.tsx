"use client";
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const [title, setTitle] = useState("");

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(
    null,
    snippet.id,
    code,
    title
  );

  return (
    <div>
      <form action={editSnippetAction}>
        <div className="mb-5 flex justify-start items-center gap-5">
          <label htmlFor="title" className="">
            New title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold"> Snippet:</h3>
          <p>{snippet.title}</p>
        </div>
        <Editor
          height="40vh"
          theme="vs-dark"
          language="javascript"
          defaultValue={snippet.code}
          options={{
            minimap: { enabled: false },
          }}
          onChange={handleEditorChange}
        />

        <button className="p-2 border rounded mt-5" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
