import React from 'react'

type Props = {
  note: {
    id: string;
    title: string;
    content: string;
  };
}

export default function Note({note}: Props) {
  return (
    <div>
      <h1>View</h1>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  )
}
