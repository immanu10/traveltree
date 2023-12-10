import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  return (
    <div>
      <h1>BucketList - {searchParams.status}</h1>
      <nav className={cn("flex space-x-2")}>
        {["todo", "visited"].map((item, i) => (
          <Link
            key={i}
            href={`/bucketlist?status=${item}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              // pathname === item.href
              // ?
              // "bg-muted hover:bg-muted",
              // :
              "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            {item}
          </Link>
        ))}
      </nav>
    </div>
  );
}
