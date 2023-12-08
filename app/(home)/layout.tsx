import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { PenSquare, PlusIcon, PlusSquare } from "lucide-react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl px-4 flex flex-col container")}>
      <header className="flex items-center h-16">
        <Link href="/" className="inline-block">
          <Icons.logo />
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/post/new"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <PlusIcon className="mr-2 w-4 h-4" />
            Create Post
          </Link>
          <UserNav />
        </div>
      </header>
      <MainNav />
      <div>{children}</div>
    </div>
  );
}
