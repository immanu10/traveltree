import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon, MountainIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Database } from "@/lib/supabase/types";

type DataProps = Database["public"]["Tables"]["bucketlists"]["Row"] & {
  posts:
    | (Database["public"]["Tables"]["posts"]["Row"] & {
        profiles: Pick<
          Database["public"]["Tables"]["profiles"]["Row"],
          "username" | "full_name"
        > | null;
      })
    | null;
};

export function BucketListRow({ data }: { data: DataProps }) {
  const { posts } = data;

  return (
    <div className="border-b py-3 flex justify-between items-center space-x-2">
      <div className="w-10/12 max-w-lg">
        <p className="inline-flex items-center text-sm  text-gray-500">
          <span>Posted by </span>
          {posts?.profiles?.username ? (
            <Link
              href={`/${posts.profiles.username}`}
              className="ml-1 hover:underline"
            >
              {posts.profiles.username}
            </Link>
          ) : (
            <span className="ml-1">{posts?.profiles?.full_name}</span>
          )}
        </p>
        <Link href={`/post/${posts?.id}`}>
          <p className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
            {posts?.title}
          </p>
        </Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
            <DropdownMenuItem>Delete Bucketlist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
