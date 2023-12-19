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
    <div className={cn("max-w-2xl flex flex-col mx-auto")}>
      <header className="sticky border-b top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center h-16 px-5">
          <Link href="/explore" className="inline-block">
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
        </div>
      </header>
      {/* <MainNav /> */}
      <div>{children}</div>
    </div>
  );
}
