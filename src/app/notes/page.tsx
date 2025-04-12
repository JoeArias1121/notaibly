

function NotesPage() {

  const onSubmit = (formData: FormData) => {
    console.log(formData);

  }

  return (
    <>
      <h1>Notes</h1>
      <form action="onSubmit" method="POST">
        <input type="number" name="userId" placeholder="User ID" />
        <input type="text" name="title" placeholder="Title" />
        <textarea name="content" placeholder="Type..."></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NotesPage;