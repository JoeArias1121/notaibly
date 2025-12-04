"use client";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/src/components/ui/item";

type Note = {
  id: number;
  text: string;
};
// TODO: Figure out how the navigation for edit will work
// TODO: improve styling so it looks somewhat like a list
export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // fetch notes from database
    const initializeNotes = async () => {
      setNotes([
        { id: 1, text: "Sample Note" },
        { id: 2, text: "Another Note" },
        { id: 3, text: "More Notes" },
      ]);
    };
    initializeNotes();
  }, []);

  const deleteNote = async (id: number) => {
    // if delete from database is successful
    // then update state without the deleted note
    const timeout = () => new Promise((res) => setTimeout(res, 1000));
    await timeout(); // Simulate async operation
    const success = true; // Placeholder for actual delete operation
    if (success) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };
  // TODO: replace the href for edit with this: `/notes/edit/${note.id}`
  const notesList = notes.map((note) => (
    <Item key={note.id} className="" variant="muted">
      <ItemContent>
        <ItemTitle>Placeholder Title</ItemTitle>
        <ItemDescription>{note.text}</ItemDescription>
      </ItemContent>
      <ItemActions className="flex justify-end w-1/8">
        <div className="w-full">
          <Link href={`/notes/view`}>
            <Button className="bg-blue-500 p-0 w-full">View</Button>
          </Link>
        </div>
        <div className="w-full">
          <Link href={`/notes/edit`}>
            <Button className="bg-yellow-500 p-0 w-full">Edit</Button>
          </Link>
        </div>
        <div className="w-full">
          <Button
            className="bg-red-600 w-full p-0"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </Button>
        </div>
      </ItemActions>
    </Item>
  ));

  return <div className="flex flex-col gap-3 w-full">{notesList}</div>;
}
