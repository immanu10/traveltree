import { Icons } from "@/components/icons";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function LandingPage() {
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
        <div className="lg:ml-[448px] flex-1 flex flex-col">
          <header className="sticky border-b top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-5 flex h-16 items-center justify-between w-full">
              <Link href="/" className="inline-block">
                <Icons.logo />
              </Link>
              <div className="ml-auto">
                <Link href={"/signin"} className={cn(buttonVariants())}>
                  Sign in
                </Link>
              </div>
            </div>
          </header>
          <main className="mt-32 px-5 flex flex-col items-start">
            <h1 className="max-w-2xl text-4xl sm:text-5xl md:text-6xl  font-bold  sm:text-left tracking-tight bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Your travel bucketlist made easy.
            </h1>
            <p className="mt-4 md:text-lg text-muted-foreground sm:text-left font-medium">
              explore, achieve, share and track your travel dreams.
            </p>
            <div className="flex gap-6 mt-8">
              <Link
                href="/explore"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Go To Explore
              </Link>
              <Link href={"/signin"} className={cn(buttonVariants())}>
                Get Started
              </Link>
            </div>
          </main>

          <section className="px-5 my-14 mt-24 grid auto-rows-[20rem] grid-cols-1 md:grid-cols-2 gap-4">
            <div className="row-span-1 border border-border rounded-lg bg-slate-50"></div>
            <div className="row-span-1 border border-border rounded-lg bg-slate-50"></div>
            <div className="row-span-2 md:col-span-2 border border-border rounded-lg bg-slate-50"></div>
          </section>

          {/* <section className="mt-24 px-5">
            <h2 className="text-xl font-semibold">
              Craft your bucketlist from suggested places by the community.
            </h2>

          </section> */}

          {/* <section className="mt-24 px-5">
            <h2 className="text-xl font-semibold">
              Create and customize your traveltree profile.
            </h2>
          </section> */}

          <footer className="py-4 px-5 flex gap-2 items-center justify-center border-t border-border">
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
