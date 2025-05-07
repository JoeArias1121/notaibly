"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  note: {
    id: string;
    title: string;
    content: string;
  };
  summarize: (content: string) => Promise<string>;
};

export default function Note({ note, summarize }: Props) {
  const [summary, setSummary] = React.useState("");

  const handleSummarize = async () => {
    const summary = await summarize(note.content);
    setSummary(summary);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {summary!! && (
        <>
          <h1 className="mt-4 text-3xl">Summary of {` "${note.title}"`}</h1>
          <p>{summary}</p>
        </>
      )}
      <h1 className="mt-4 text-3xl">Title:{` ${note.title}`}</h1>
      <Button onClick={handleSummarize} className="">
        Summarize with AI
      </Button>
      <div className="border-2 border-blue-50 flex flex-col items-start justify-center min-w-auto max-w-11/12">
        <p className="m-2">{note.content}</p>
      </div>
    </div>
  );
}
