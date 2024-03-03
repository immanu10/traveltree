import { Icons } from "@/components/icons";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BentroGridFeatures } from "@/components/home/features";
import Image from "next/image";

export default async function LandingPage() {
  return (
    <>
      <div className="flex h-screen">
        <div className="road hidden lg:block w-80 bg-[#000] fixed inset-y-0 left-10">
          <div className="flex justify-between h-full">
            <div className="h-full w-4 bg-white ml-2 z-10"></div>
            <div className="overflow-y-hidden relative flex flex-col">
              <div className="flex flex-col space-y-20">
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
              </div>
              {/* <div className="absolute top-0 animate-marquee2 flex flex-col space-y-20">
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
                <div className="h-36 w-4 bg-white z-10"></div>
              </div> */}
            </div>
            <div className="h-full w-4 bg-white mr-2 z-10"></div>
          </div>
        </div>
        <div className="lg:ml-[360px] flex-1 flex flex-col">
          <header className="sticky border-b top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-5 flex h-16 items-center justify-between w-full">
              <Link href="/" className="inline-block">
                <Image
                  src="/traveltree.svg"
                  width={80}
                  height={40}
                  alt="traveltree logo"
                  priority
                />
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
