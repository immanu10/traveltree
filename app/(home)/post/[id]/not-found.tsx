import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center my-6">
      <h2 className="font-bold text-lg">
        404.
        <span className="ml-2 font-normal text-muted-foreground">
          Not Found!
        </span>
      </h2>
      <p className="text-sm text-center">Could not find requested resource.</p>
      <Link href="/explore" className={buttonVariants({ variant: "link" })}>
        Return Home
      </Link>
    </div>
  );
}
