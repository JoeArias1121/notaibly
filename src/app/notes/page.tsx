'use client'
import { useState } from 'react';
import axios from 'axios';

function NotesPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/notes', {
        title,
        content,
        userId: 1,
      })
      console.log("Success:", response.data);
    }catch (err) {
      console.error('Error creating note', err)
      alert('Error creating note')
    }

  }

  return (
    <>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit} method="POST">
        <input type="number" name="userId" placeholder="User ID" />
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NotesPage;