import { Dispatch, SetStateAction } from "react";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerHeader } from "./ui/drawer";
import useSWR from "swr";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitialFromFullName } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Heart, LinkIcon, Loader2, User } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

//@ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

type LikedByProfileData = {
  data: {
    profiles: {
      username: string | null;
      full_name: string | null;
      avatar_url: string | null;
    } | null;
  }[];
};

export function LikedByDrawer({
  id,
  count,
  open,
  setOpen,
}: {
  id: number;
  count: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data, error, isLoading } = useSWR<LikedByProfileData>(
    open ? `/api/buckets?postid=${id}` : null,
    fetcher
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <div className="text-center text-muted-foreground flex items-center justify-center">
              <Heart className="w-4 h-4 mr-2 fill-pink-500" />
              <h2 className="font-semibold">{count} Buckets</h2>
            </div>
          </SheetHeader>
          <div className="flex flex-row items-center justify-between border-b border-border my-4 py-1">
            <h4 className="text-sm font-semibold">Added by</h4>
            <p className="text-xs font-medium text-muted-foreground">
              Visit profile
            </p>
          </div>
          {isLoading && data === undefined ? (
            <LikedListSkeleton />
          ) : (
            <LikedList data={data?.data} />
          )}
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="px-4 max-h-[60%] min-h-[400px]">
        <DrawerHeader>
          <div className="text-center text-muted-foreground flex items-center justify-center">
            <Heart className="w-4 h-4 mr-2 fill-pink-500" />
            <h2 className="font-semibold">{count} Buckets</h2>
          </div>
        </DrawerHeader>
        <div className="flex flex-row items-center justify-between border-b border-border my-4 py-1">
          <h4 className="text-sm font-semibold">Added by</h4>
          <p className="text-xs font-medium text-muted-foreground">
            Visit profile
          </p>
        </div>

        {isLoading && data === undefined ? (
          <LikedListSkeleton />
        ) : (
          <LikedList data={data?.data} />
        )}
      </DrawerContent>
    </Drawer>
  );
}

function LikedList({
  data,
}: {
  data:
    | {
        profiles: {
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
        } | null;
      }[]
    | undefined;
}) {
  if (data === undefined || data?.length === 0)
    return <p className="text-center text-muted-foreground text-sm">No Data</p>;

  return (
    <div className="w-full overflow-y-auto">
      {data.map((item, i) => {
        const { profiles } = item;

        return (
          <div key={i} className="flex justify-between items-center  py-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={profiles?.avatar_url || undefined}
                  alt={profiles?.full_name || undefined}
                />
                <AvatarFallback>
                  {profiles?.full_name
                    ? getInitialFromFullName(profiles?.full_name)
                    : ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold leading-none">
                  {profiles?.full_name}
                </p>
                <span className="text-xs font-medium text-muted-foreground">
                  {profiles?.username
                    ? `@${profiles?.username}`
                    : "No username"}
                </span>
              </div>
            </div>
            {profiles?.username ? (
              <Link
                href={`/${profiles.username}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                })}
              >
                <LinkIcon className="w-4 h-4" />
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function LikedListSkeleton() {
  return (
    <div className="w-full overflow-y-auto">
      <SkeletonLikedBy />
      <SkeletonLikedBy />
      <SkeletonLikedBy />
      <SkeletonLikedBy />
      {/* <div className="flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-200" />
      </div> */}
    </div>
  );
}

function SkeletonLikedBy() {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center space-x-2 w-8/12">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="w-full h-3 rounded-none" />
          <Skeleton className="w-5/12 h-3 rounded-none" />
        </div>
      </div>
      <Skeleton className="w-8 h-9 rounded-md" />
    </div>
  );
}
