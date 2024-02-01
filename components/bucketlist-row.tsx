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
import {
  CheckCheck,
  MoreHorizontalIcon,
  MountainIcon,
  Trash2,
} from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
    <div className="border-b py-3 flex justify-between items-center gap-2">
      <div className="w-7/12 max-w-lg">
        <div className="inline text-xs text-gray-500">
          <span>Posted by </span>
          {posts?.profiles?.username ? (
            <Link
              href={`/${posts.profiles.username}`}
              className="hover:underline inline-block"
            >
              {posts.profiles.username}
            </Link>
          ) : (
            <span>{posts?.profiles?.full_name}</span>
          )}
        </div>
        <Link href={`/post/${posts?.id}`} className="">
          <h3 className="text-sm text-foreground font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {posts?.title}
          </h3>
          <p className="text-accent-foreground text-sm text-ellipsis overflow-hidden whitespace-nowrap">
            {posts?.description}
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <CheckCheck className="h-4 w-4" />
              <span className="sr-only">Mark as visited</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark as visited</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove bucketlist</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove bucketlist</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
