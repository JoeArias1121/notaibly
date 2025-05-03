'use client'
import { useState } from "react";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/ui/textarea-with-label";

type Props = {
  handleNoteEdit: (formData: FormData, id: number) => Promise<void>;
  note: {
    id: number;
    title: string;
    content: string;
  };
};

export default function EditNoteForm({ handleNoteEdit, note }: Props) {
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title);
  console.log("content", content);
  console.log("title", title);
  return (
    <form
      className="flex flex-col min-w-1/2 gap-3 justify-center items-center "
      action={async (formData) => {
        await handleNoteEdit(formData, note.id);
      }}
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
      <Button type="submit">Submit Changes</Button>
    </form>
  );
}
