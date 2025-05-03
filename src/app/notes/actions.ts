"use server";
import axios from "axios";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const handleNoteSubmit = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    throw new Error("Not authenticated");
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get("user_id");
  const userId = cookie ? Number(cookie.value) : null;

  if (!userId) {
    console.error("User ID not found in cookies");
    throw new Error("User ID not found in cookies");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    const response = await axios.post(`${process.env.SITE_URL}/api/notes`, {
      title,
      content,
      userId,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to create note, response: ${response.status}`);
    }
    console.log("Success posting note:", response.data);
    revalidatePath("/notes");
  } catch (err) {
    console.error("Error creating note", err);
    alert("Error creating note");
  }
};

export const handleNoteEdit = async (formData: FormData, id: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated");
    throw new Error("Not authenticated");
  }
  const cookieStore = await cookies();
  const cookie = cookieStore.get("user_id");
  const userId = cookie ? cookie.value : null;

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  try {
    const response = await axios.patch(
      `${process.env.SITE_URL}/api/notes/${id}`,
      {
        title,
        content,
      },
      {
        params: { userId },
      }
    );
    if (response.status !== 200) {
      throw new Error(`Failed to update note, response: ${response.status}`);
    }
    console.log("Success updating note:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating note", err);
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get(`${process.env.SITE_URL}/api/notes`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch notes");
    }
    return response.data;
  } catch (err) {
    console.error("Error fetching notes", err);
    alert("Error fetching notes");
  }
};

export const getNoteById = async (id: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated");
    throw new Error("Not signed in");
  }
  const cookieStore = await cookies();
  const cookie = cookieStore.get("user_id");
  const userId = cookie ? Number(cookie.value) : null;
  if (!userId) {
    console.error("User ID not found in cookies");
    throw new Error("User ID not found in cookies");
  }

  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/notes/${id}`,
      {
        params: { userId },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch note");
    }
    console.log("Fetched note:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching note", err);
  }
};
