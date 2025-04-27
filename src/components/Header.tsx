import React from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div>
      <Link href="/">
        <h1>Notaibly</h1>
      </Link>
      <ThemeToggle />
      <nav>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
    </div>
  );
}
