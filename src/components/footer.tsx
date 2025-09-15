import { Footprints } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-2 mb-2">
            <Footprints className="h-5 w-5 text-primary" />
            <p className="text-sm font-bold">Sole Mate</p>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Sole Mate. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
