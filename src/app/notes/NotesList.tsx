import { Button } from "@/components/ui/button";

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
          <div className="flex border-2 border-blue-50">
            <p className="w-3/4 m-1">{note.content}</p>
            <div className="flex justify-end m-2 w-1/4 gap-2">
              <Button>View</Button>
              <Button>Edit</Button>
              <Button className="bg-destructive">Delete</Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
