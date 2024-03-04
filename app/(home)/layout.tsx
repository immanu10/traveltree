import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getSessionUser } from "@/lib/supabase/helpers";
import { ClaimUserNameCheck } from "./claim-username";
import { Metadata } from "next";
import Image from "next/image";

const title = "Traveltree.co | Home";
const description =
  "Traveltree.co is a platform to create, discover, and track your bucket list. It also allows you to create, customize, and share your travel profile.";

export const metadata: Metadata = {
  metadataBase: new URL("https://traveltree.co"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "Traveltree.co",
    title,
    description,
    url: "https://traveltree.co",
    images: [
      {
        type: "image/jpeg",
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Traveltree.co",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    site: "@immanu10x",
    description,
    creator: "@immanu10x",
    images: [
      {
        type: "image/jpeg",
        url: "/og.jpg",
        width: 1920,
        height: 1080,
        alt: "Traveltre.co",
      },
    ],
  },
};

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
          <Link href="/">
            <Image
              src="/traveltree.svg"
              width={80}
              height={40}
              alt="traveltree logo"
              priority
            />
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
