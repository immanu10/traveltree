import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default async function NotFound() {
  return (
    <div className="max-w-2xl min-h-screen mx-auto flex flex-col">
      <header className="sticky border-b top-0 z-50 w-full  bg-background">
        <div className="flex items-center h-16 px-4 md:px-0">
          <Link href="/explore">
            <Icons.logo />
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-8xl text-red-500">404</h1>
        <p className="text-sm font-medium">Sorry, page not found.</p>
        <Link href={"/"} className={cn(buttonVariants(), "mt-4")}>
          Go Home
        </Link>
      </main>
    </div>
  );
}
