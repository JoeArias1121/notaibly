import { redirect } from "next/navigation";
import NotesForm from "@/app/notes/NotesForm";
import NotesList from "@/app/notes/NotesList";
import { handleNoteSubmit, getNotes } from "@/app/notes/actions";
import { checkUserLoggedIn } from "@/utils/supabase/server";

async function NotesPage() {
  // checking to see if user is logged in
  // if not, redirect to login page
  const loggedIn = await checkUserLoggedIn()
  if (!loggedIn) {
    console.log("User not logged in, redirecting to login page");
    return redirect("/login");
  }

  const notes = await getNotes();

  return (
    <div className="flex flex-col gap-8 items-center h-screen">
      <h1 className="text-3xl font-medium m-16">Notes</h1>
      <NotesForm handleNoteSubmit={handleNoteSubmit} />
      <NotesList notes={notes} />
    </div>
  );
}

export default NotesPage;
