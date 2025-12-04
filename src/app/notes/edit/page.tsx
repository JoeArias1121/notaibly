import React from 'react'
import { Textarea } from '@/src/components/ui/textarea'
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function page() {
  return (
    <div>
      <h1>Edit Note</h1>
      <Link href={"/notes"}>
        <Button>Back to notes</Button>
      </Link>
      <Textarea placeholder="Edit your note here..." className="w-full h-40" />
    </div>
  );
}
