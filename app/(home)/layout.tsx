import { AuthDialog } from "@/components/auth-dialog";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className={cn("max-w-2xl flex flex-col mx-auto")}>
      <header className="sticky border-b top-0 z-50 w-full  bg-background">
        <div className="flex items-center h-16 px-4 md:px-0">
          <Link href="/explore" className="inline-block">
            <Icons.logo />
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/post/new"
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <PlusIcon className="mr-2 w-4 h-4" />
                  Create Post
                </Link>
                <UserNav session={session} />
              </>
            ) : (
              <AuthDialog>
                <Button>Sign in</Button>
              </AuthDialog>
            )}
          </div>
        </div>
      </header>
      {/* <MainNav /> */}
      <div>{children}</div>
    </div>
  );
}
