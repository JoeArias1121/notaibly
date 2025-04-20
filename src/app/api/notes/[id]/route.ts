import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id },
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
  const id = Number(params.id);
  const { title, content } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  } catch (err) {
    console.error("Error updating note", err);
    return NextResponse.json({ error: "Error updating note" }, { status: 500 });
  }
}
