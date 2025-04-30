"use client";
import { useState } from "react";
import axios from "axios";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/ui/textarea-with-label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function NotesPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  // checking to see if user is logged in
  // if not, redirect to login page
  const supabase = await createClient();
  const { data: {user}} = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/notes", {
        title,
        content,
        userId: 1,
      });

      if (response.status !== 200) {
        throw new Error("Failed to create note");
      }
      console.log("Success:", response.data);
    } catch (err) {
      console.error("Error creating note", err);
      alert("Error creating note");
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center h-screen">
      <h1 className="text-3xl font-medium m-16">Notes</h1>
      <form
        className="flex flex-col min-w-1/2 gap-3 justify-center items-center "
        onSubmit={handleSubmit}
        method="POST"
      >
        <InputWithLabel
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          required={true}
        />
        <TextareaWithLabel
          id="Content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type..."
          required={true}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default NotesPage;
