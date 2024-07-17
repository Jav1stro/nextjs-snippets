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
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({});

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const validate = () => {
    const newErrors: { title?: string; code?: string } = {};
    if (!title || title.length < 3) {
      newErrors.title =
        "Title is required and must have more than 2 characters";
    }
    if (!code || code.length < 10) {
      newErrors.code = "Code is required and must have more than 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await actions.editSnippet(snippet.id, code, title);
        // Aquí podrías agregar alguna lógica para redireccionar o mostrar un mensaje de éxito
      } catch (error) {
        // Manejo de errores del servidor
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Snippet:</h3>
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
        {errors.code && <p className="text-red-500">{errors.code}</p>}
        <button className="p-2 border rounded mt-5" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
