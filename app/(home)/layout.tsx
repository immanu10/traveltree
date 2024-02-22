import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getSessionUser } from "@/lib/supabase/helpers";
import { ClaimUserNameCheck } from "./claim-username";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSessionUser();

  return (
    <div className={cn("max-w-2xl flex flex-col mx-auto")}>
      <header className="sticky border-b top-0 z-50 w-full  bg-background">
        <div className="flex items-center h-16 px-4 md:px-0">
          <Link href="/explore">
            <Icons.logo />
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            {sessionUser ? (
              <>
                <Link
                  href="/post/new"
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <PlusIcon className="mr-2 w-4 h-4" />
                  Create Post
                </Link>
                <UserNav sessionUser={sessionUser} />
              </>
            ) : (
              <Link href={"/signin"} className={cn(buttonVariants())}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      {/* <MainNav /> */}
      <main>
        {sessionUser && <ClaimUserNameCheck sessionUser={sessionUser} />}
        {children}
      </main>
    </div>
  );
}
