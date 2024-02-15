import { Icons } from "@/components/icons";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthDialog } from "@/components/auth-dialog";
import { getSessionUser } from "@/lib/supabase/helpers";

export default async function LandingPage() {
  const session = await getSessionUser();

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:block w-96 bg-black fixed inset-y-0 left-16">
          <div className="absolute h-full w-4 bg-white left-2"></div>
          <div className="absolute h-full w-4 bg-white right-2"></div>
          <div className="absolute h-1/6 w-4 bg-white top-2 left-1/2 transform -translate-x-1/2 "></div>
          <div className="absolute h-2/6 w-4 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-1/6 w-4 bg-white bottom-2 left-1/2 transform -translate-x-1/2 "></div>
        </div>
        <div className="lg:ml-[448px] flex-1 flex flex-col justify-between">
          <header className="sticky border-b top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-5 flex h-16 items-center justify-between w-full">
              <Link href="/" className="inline-block">
                <Icons.logo />
              </Link>
            </div>
          </header>
          <main className="px-5 flex flex-col gap-4  max-w-4xl items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  sm:text-left">
              explore, achieve, and track your travel dreams.
            </h1>
            <p className="text-lg md:text-xl font-light  sm:text-left">
              your pathway to personalized travel adventures: discover suggested
              places from the community, create, track, and share your travel
              tree with the world.
            </p>
            <div className="flex gap-4">
              <Link
                href="/explore"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Go To Explore
              </Link>
              {!session && (
                <AuthDialog>
                  <Button>Get Started</Button>
                </AuthDialog>
              )}
            </div>
          </main>

          <footer className="py-4 px-5 flex gap-2 items-center justify-center ">
            <p className="text-xs">Made with ❤️ in Bengaluru, India</p>
            <span className="text-xs">|</span>
            <Github className="w-4 h-4" />
            <Linkedin className="w-4 h-4" />
          </footer>
        </div>
      </div>
    </>
  );
}
