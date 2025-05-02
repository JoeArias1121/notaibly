import { Button } from "@/components/ui/button";
import Link from "next/link";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function NotesList({ notes, ...props }: { notes: Note[] }) {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className=" min-w-7/12">
          <h1 className="text-lg font-medium">Title:{` ${note.title}`}</h1>
          <div className="flex items-center border-2 border-blue-50">
            <p className="w-3/4 m-1">{note.content}</p>
            <div className="flex justify-end m-2 w-1/4 gap-2">
              <Link href={`/notes/view/${note.id}`}>
                <Button>View</Button>
              </Link>
              <Link href={`/notes/edit/${note.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button className="bg-destructive">Delete</Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
