"use client";
import { useState } from "react";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/ui/textarea-with-label";

type Props = {
  handleNoteSubmit: (formData: FormData) => Promise<void>;
};

export default function NotesForm({ handleNoteSubmit }: Props) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  return (
    <form
      className="flex flex-col min-w-1/2 gap-3 justify-center items-center "
      action={async (formData) => {
        await handleNoteSubmit(formData);
        setContent("");
        setTitle("");
      }}
      method="POST"
    >
      <InputWithLabel
        id="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title"
        type="text"
        required={true}
      />
      <TextareaWithLabel
        id="Content"
        name="content"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Type..."
        required={true}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
