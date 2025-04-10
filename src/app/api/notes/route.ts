import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const notes = await prisma.note.findMany();
  console.log(notes);
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const { title, content, userId } = await req.json();
  if (!title || !content || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });
    console.log(note);
    return NextResponse.json(note);
  } catch (err) {
    console.error("Error creating note", err);
    return NextResponse.json({ error: "Error creating note" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) {
    console.log("Missing id");
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const note = await prisma.note.delete({
      where: { id },
    });
    console.log(note);
    return NextResponse.json({ note });
  } catch (err) {
    console.error("Error deleting note", err);
    return NextResponse.json({ error: "Error deleting note" }, { status: 400 });
  }
}
