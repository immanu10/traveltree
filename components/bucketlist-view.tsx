"use client";
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
import { useState } from "react";
import { MoveTodoBucketList } from "./form/move-todo-bucketlist";

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
export function TodoBucketListView({ data }: { data: DataProps[] }) {
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

  const emptyTodoBucketList = data.length === 0;

  if (emptyTodoBucketList)
    return <p className="text-red-500 text-center mt-4">No Todo Bucketlist</p>;

  return (
    <>
      {data.map((item) => (
        <TodoBucketListRow
          key={item.id}
          data={item}
          open={open[item.id]}
          onOpenChange={() => toggleOpenChange(item.id)}
        />
      ))}
    </>
  );
}

export function VisitiedBucketListView({ data }: { data: DataProps[] }) {
  const emptyVisitedBucketList = data.length === 0;
  if (emptyVisitedBucketList)
    return (
      <p className="text-red-500 text-center mt-4">No visited Bucketlist</p>
    );
  return (
    <>
      {data.map((item) => (
        <VisitedBucketListRow key={item.id} data={item} />
      ))}
    </>
  );
}

function TodoBucketListRow({
  data,
  open,
  onOpenChange,
}: {
  data: DataProps;
  open: boolean;
  onOpenChange: () => void;
}) {
  const { posts } = data;

  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
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
                @{posts.profiles.username}
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
          <DeleteBucketList id={data.id} title={data.posts?.title} />
        </div>
      </div>
      <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <MarkVisitedBucketlist id={data.id} closeCollapsible={onOpenChange} />
      </CollapsibleContent>
    </Collapsible>
  );
}

function VisitedBucketListRow({ data }: { data: DataProps }) {
  const { posts } = data;

  return (
    <div className="border-b py-4 px-4 md:px-0">
      <div className="w-full flex justify-between items-center gap-2 px-1">
        <div className="w-7/12 max-w-lg">
          <div className="inline text-xs text-gray-500">
            <span>Posted by </span>
            {posts?.profiles?.username ? (
              <Link
                href={`/${posts.profiles.username}`}
                className="hover:underline inline-block"
              >
                @{posts.profiles.username}
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
          <p className="text-xs mt-2 text-gray-600">{`Visited in: ${data.visited_month}, ${data.visited_year}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <MoveTodoBucketList id={data.id} title={data.posts?.title} />
          <DeleteBucketList id={data.id} title={data.posts?.title} />
        </div>
      </div>
    </div>
  );
}
