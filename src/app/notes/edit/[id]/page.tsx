import React from 'react'
import EditNoteForm from '@/app/notes/edit/[id]/EditNoteForm'
import { getNoteById, handleNoteEdit } from '@/app/notes/actions'

export default async function NoteEdit({ params }: { params: { id: string } }) {
  const { id } = await params;
  const note = await getNoteById(id);
  if (!note) {
    return <div>Note not found</div>
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mt-4 text-3xl">Editting: {` ${note.title}`}</h1>
      <EditNoteForm note={note} handleNoteEdit={handleNoteEdit} />
    </div>
  );
}