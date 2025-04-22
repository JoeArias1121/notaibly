import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const { email, username, password } = await req.json();
  if (!email || !username || !password) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error("User with that email already exists");
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    console.log("User created", user);
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error("Error creating user", err);
    return NextResponse.json(
      { success: false, error: "Error creating user" },
      { status: 400 }
    );
  }
}
