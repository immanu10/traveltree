import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="container flex min-h-screen justify-between">
      <div className="hidden xl:block min-h-screen w-96 bg-black relative">
        <div className="absolute h-full w-4 bg-white left-2"></div>
        <div className="absolute h-full w-4 bg-white right-2"></div>
        <div className="absolute h-1/6 w-4 bg-white top-2 left-1/2 transform -translate-x-1/2 "></div>
        <div className="absolute h-2/6 w-4 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute h-1/6 w-4 bg-white bottom-2 left-1/2 transform -translate-x-1/2 "></div>
      </div>
      <div className="flex flex-col my-8 justify-between">
        <header className="">
          <Link href="/" className="flex items-center">
            <Icons.logo />
          </Link>
        </header>
        <main className="flex flex-col gap-4 items-center max-w-4xl sm:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center sm:text-left">
            explore, achieve, and track your travel dreams.
          </h1>
          <p className="text-lg md:text-xl font-light text-center sm:text-left">
            your pathway to personalized travel adventures: discover suggested
            places from the community, create, track, and share your travel tree
            with the world.
          </p>
          <Button variant="outline">
            <Icons.google className="mr-2 w-4 h-4" /> Sign in with Google
          </Button>
        </main>
        <footer className="flex gap-2 items-center justify-center sm:justify-start">
          <p className="text-xs">Made with ❤️ in Bengaluru, India</p>
          <span className="text-xs">|</span>
          <Github className="w-4 h-4" />
          <Linkedin className="w-4 h-4" />
        </footer>
      </div>
    </div>
  );
}
