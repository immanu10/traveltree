import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  ClipboardCopy,
  CopyIcon,
  Github,
  Linkedin,
  Mountain,
  MountainIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BentroGridFeatures } from "@/components/home/features";

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

          {/* <section className="px-5 my-14 mt-24 grid auto-rows-[20rem] grid-cols-1 md:grid-cols-2 gap-4">
            <div className="row-span-1 border border-border rounded-lg relative p-4">
              <div className="w-20 h-full absolute top-0 left-0 bg-gradient-to-r from-white to-transparent overflow-hidden"></div>
              <div className="w-10/12  mt-6 border-pink-400 border-y border-r flex flex-col gap-2 py-2 rounded-lg rounded-tl-none rounded-bl-none">
                <div className="px-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="inline text-xs text-muted-foreground font-medium">
                        <span>Posted by </span>
                        <span>@immanu10</span>
                        <span className="mx-1 font-bold">&middot;</span>
                        <span>22, feb 2023</span>
                      </div>
                      <h3 className="font-medium text-lg">Goa</h3>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground font-medium flex gap-1 items-center">
                    <p>{`Best time to visit: `}</p>
                    <Badge variant="secondary" className="font-medium">
                      All months
                    </Badge>
                  </div>
                  <div className="my-2  rounded-sm flex items-center text-xs">
                    <span className="text-blue-500 hover:underline overflow-hidden text-ellipsis">
                      map.sdkdso/dfl
                    </span>
                    <Separator orientation="vertical" className="h-4 mx-2" />
                    <CopyIcon className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="text-sm my-2 w-full">
                    <p className="text-justify">Dummy description... test</p>
                  </div>
                </div>
                <div className="px-4">
                  <button className="flex items-center cursor-pointer group transition-colors w-fit">
                    <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
                      <MountainIcon
                        className={cn(
                          "text-gray-500 w-[18px] h-[18px] group-hover:text-pink-500"
                        )}
                      />
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-pink-500">
                      <span>6996 buckets</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-b from-background to-slate-100 ">
                <h3 className=" font-semibold">
                  Explore and Create bucketlist
                </h3>
                <p className="text-muted-foreground text-sm">
                  Just like the post and your bucketlist is created.
                </p>
              </div>
            </div>
            <div className="row-span-1 border border-border rounded-lg bg-slate-50">
            </div>
            <div className="row-span-2 md:col-span-2 border border-border rounded-lg bg-slate-50">
            </div>
          </section> */}
          <BentroGridFeatures className="my-14 mt-24" />

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
