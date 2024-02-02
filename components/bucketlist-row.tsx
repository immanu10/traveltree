"use client";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { Database } from "@/lib/supabase/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { DeleteBucketList } from "./form/delete-bucketlist";
import { MarkVisitedBucketlist } from "./form/mark-visited-bucketlist";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

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
export function BucketListView({ data }: { data: DataProps[] }) {
  const initialOpenState = data.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: false,
    };
  }, {}) as { [key: number]: boolean };

  const [open, setOpen] = useState(initialOpenState);

  const toggleOpenChange = (item: number) => {
    setOpen((prev) => {
      const updatedState: { [key: number]: boolean } = {};
      Object.keys(prev).forEach((key) => {
        updatedState[parseInt(key)] = false;
      });
      updatedState[item] = !prev[item];
      return updatedState;
    });
  };

  return (
    <>
      {data.map((item) => (
        <BucketListRow
          key={item.id}
          data={item}
          open={open[item.id]}
          onOpenChange={toggleOpenChange}
        />
      ))}
    </>
  );
}

export function BucketListRow({
  data,
  open,
  onOpenChange,
}: {
  data: DataProps;
  open: boolean;
  onOpenChange: (item: number) => void;
}) {
  const { posts } = data;

  return (
    <Collapsible
      open={open}
      onOpenChange={() => onOpenChange(data.id)}
      className="border-b py-0 data-[state=closed]:py-4 data-[state=open]:pt-4 px-4 md:px-0"
    >
      <div className="w-full flex justify-between items-center gap-2 px-1">
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
            <CollapsibleTrigger asChild className="data-[state=open]:bg-accent">
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <CheckCheck className="h-4 w-4" />
                  <span className="sr-only">Mark as visited</span>
                </Button>
              </TooltipTrigger>
            </CollapsibleTrigger>
            <TooltipContent>Mark as visited</TooltipContent>
          </Tooltip>
          <DeleteBucketList data={data} />
        </div>
      </div>
      <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <MarkVisitedBucketlist data={data} />
      </CollapsibleContent>
    </Collapsible>
  );
}
