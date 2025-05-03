import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {params}: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  //TODO: figure out the params issue
  const temp = await params
  const id = Number(temp.id);
  if (!id || !userId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(id), userId },
      select: {
        id: true,
        title: true,
        content: true,
      }
    });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(note);
  } catch (err) {
    console.error("Error fetching note", err);
    return NextResponse.json({ error: "Error fetching note" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("userId"));
  const id = Number(params.id);
  const { title, content } = await req.json();
  if (!id || !userId || !title || !content) {
    console.log("Missing field/s", { id, userId, title, content });
    return NextResponse.json({ error: "Missing field/s" }, { status: 400 });
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id, userId },
      data: {
        title,
        content,
      },
      select: {
        id: true,
        title: true,
        content: true,
      }
    });
    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(updatedNote);
  } catch (err) {
    console.error("Error updating note", err);
    return NextResponse.json({ error: "Error updating note" }, { status: 500 });
  }
}
