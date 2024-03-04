import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-14 py-6 pb-8 px-4 flex flex-col space-y-4 items-center border-t border-border text-muted-foreground">
      <div className="flex items-center space-x-4">
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
      <div className="text-xs flex items-center space-x-2">
        <p> &copy; {new Date().getFullYear()} traveltree.co</p>
        <span className="font-bold">&middot;</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
