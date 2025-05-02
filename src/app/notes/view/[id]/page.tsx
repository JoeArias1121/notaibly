import React from "react";
import { getNoteById } from "@/app/notes/actions";
import { checkUserLoggedIn } from "@/utils/supabase/server";
import Note from "@/app/notes/view/[id]/Note";
import { redirect } from "next/navigation";

export default async function NoteView({ params }: { params: { id: string } }) {
  // checking to see if user is logged in
  // if not, redirect to login page
  const loggedIn = await checkUserLoggedIn();
  if (!loggedIn) {
    console.log("User not logged in, redirecting to login page");
    return redirect("/login");
  }
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <div>
      <Note note={note} />
    </div>
  );
}
