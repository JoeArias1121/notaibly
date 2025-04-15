'use client'
import { useState } from 'react';

function NotesPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const onSubmit = (formData: FormData) => {
    console.log(formData);

  }

  return (
    <>
      <h1>Notes</h1>
      <form action="onSubmit" method="POST">
        <input type="number" name="userId" placeholder="User ID" />
        <input type="text" value={title} name="title" onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea name="content" value={content} placeholder="Type..."></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NotesPage;