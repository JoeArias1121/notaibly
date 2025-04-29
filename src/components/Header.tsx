import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-3 bg-lime-700">
      <Link href="/" className="min-w-1/12 flex">
        <h1 className="text-2xl font-bold">Notaibly</h1>
      </Link>
      <div className="flex justify-end min-w-3/12 gap-3">
        <ThemeToggle />
        <nav className="flex gap-3">
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
