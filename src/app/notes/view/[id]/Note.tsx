import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  note: {
    id: string;
    title: string;
    content: string;
  };
};

export default function Note({ note }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="mt-4 text-3xl">Title:{` ${note.title}`}</h1>
      <div className="border-2 border-blue-50 flex flex-col items-start justify-center min-w-auto max-w-11/12">
        <p className="m-2">{note.content}</p>
      </div>
      <Button className="">Summarize with AI</Button>
    </div>
  );
}
