import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div>
      <Link href="/">
        <h1>Notaibly</h1>
      </Link>
      <ThemeToggle />
      <nav>
        <Link href="/login">
          <Button>Log In</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </nav>
    </div>
  );
}
