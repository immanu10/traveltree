import { Icons } from "@/components/icons";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BentroGridFeatures } from "@/components/home/features";

export default async function LandingPage() {
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:block w-80 bg-black fixed inset-y-0 left-10">
          <div className="absolute h-full w-4 bg-white left-2"></div>
          <div className="absolute h-full w-4 bg-white right-2"></div>
          <div className="absolute h-1/6 w-4 bg-white top-2 left-1/2 transform -translate-x-1/2 "></div>
          <div className="absolute h-2/6 w-4 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-1/6 w-4 bg-white bottom-2 left-1/2 transform -translate-x-1/2 "></div>
        </div>
        <div className="lg:ml-[360px] flex-1 flex flex-col">
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
          <BentroGridFeatures className="my-14 mt-24" />
          <footer className="mt-14 py-6 pb-8 px-4 flex flex-col space-y-4 items-center border-t border-border text-muted-foreground">
            <div className="flex items-center space-x-2">
              <p className="text-xs">
                A side project by{" "}
                <a
                  href={"https://x.com/immanu10x"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  immanu10
                </a>
              </p>
              <span className="text-xs">|</span>
              <a
                href={"https://github.com/immanu10"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={"https://in.linkedin.com/in/immanu10"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs">
              &copy; {new Date().getFullYear()} traveltree.co
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
