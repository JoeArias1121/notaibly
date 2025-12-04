"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold ">Notaibly</div>
      {pathname === "/login" ? (
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
