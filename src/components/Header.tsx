import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getUser } from "@/utils/supabase/server";
import { logout } from "@/actions/actions";

export default async function Header() {
  const user = await getUser();
  return (
    <div className="flex justify-between items-center px-3 py-1 bg-lime-700">
      <Link href="/" className="min-w-1/3 flex">
        <h1 className="text-2xl font-bold">Notaibly</h1>
      </Link>
      <Link href="/notes" className="min-w-1/3 flex justify-center font-medium">
        Notes
      </Link>
      <div className="flex justify-end min-w-1/3 gap-3">
        <ThemeToggle />
        <nav className="flex gap-3">
          {user ? (
            <>
              <form action={logout}>
                <Button>Logout</Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
