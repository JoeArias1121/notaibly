import React from 'react';
import { Button } from '@/src/components/ui/button';

function Header() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="text-xl font-bold bg-amber-900">
        Notaibly
      </div>
      <Button>
        Sign In
      </Button>
    </div>
  );
}

export default Header;