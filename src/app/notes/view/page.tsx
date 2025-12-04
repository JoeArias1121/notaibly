import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Edit Note</h1>
      <Link href={"/notes"}>
        <Button>Back to notes</Button>
      </Link>
      <p>Placeholder note</p>
    </div>
  );
}
