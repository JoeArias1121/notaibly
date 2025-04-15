import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server"; 

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {

  } catch (err) { 
    console.error("Error updating note", err);
    return NextResponse.json({ error: "Error updating note" }, { status: 500 });
  }
}