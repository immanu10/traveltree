"use client";

import { cn } from "@/lib/utils";
import { Mountain, Navigation, Route } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="border-y flex items-end justify-around md:justify-center md:space-x-16 h-14 text-sm font-medium">
      <Link
        href="/explore"
        className={cn(
          "transition-colors hover:text-foreground/80 flex flex-col items-center px-3 py-1 border-b-2",
          pathname === "/explore"
            ? "text-foreground  border-black"
            : "text-foreground/60 border-transparent"
        )}
      >
        <Navigation className="mb-1 w-4 h-4" />
        <span>Explore</span>
      </Link>
      <Link
        href="/tree"
        className={cn(
          "transition-colors hover:text-foreground/80 flex flex-col items-center px-3 py-1 border-b-2",
          pathname === "/tree"
            ? "text-foreground  border-black"
            : "text-foreground/60 border-transparent"
        )}
      >
        <Route className="mb-1 w-4 h-4" />
        <span>Your Tree</span>
      </Link>
      <Link
        href="/bucketlist"
        className={cn(
          "transition-colors hover:text-foreground/80 flex flex-col items-center px-3 py-1 border-b-2",
          pathname === "/bucketlist"
            ? "text-foreground  border-black"
            : "text-foreground/60 border-transparent"
        )}
      >
        <Mountain className="mb-1 w-4 h-4" />
        <span>Bucket List</span>
      </Link>
    </nav>
  );
}
