import { BucketListTable } from "@/components/bucketlist-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon, MountainIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { status?: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  // const { data } = await supabase
  //   .from("bucketlists")
  //   .select("*,posts(*)")
  //   .eq("user_id", session.user.id);

  // if (!data) {
  //   return <p className="text-red-500">No Bucketlist Added</p>;
  // }

  return (
    <div className="my-4">
      <div className="border-l-4 border-gray-300 px-2">
        <h1 className="text-xl">Bucketlist</h1>
      </div>
      <div className="mt-4 w-full grid grid-cols-3 gap-4 text-xs text-muted-foreground justify-items-center">
        <p>Travel Post</p>
        <p>Visited on</p>
        <p>Action</p>
      </div>
      <div className="mt-4 space-y-2">
        <div className="todo-section">
          <div className="border-l-4 border-green-500 px-2">
            <h2>Todo</h2>
          </div>
          <div className="py-2 border-b grid grid-cols-3 gap-4 items-center justify-items-center">
            <div className="travel-post">
              <div className="flex space-x-2">
                <form action="">
                  <button
                    type="submit"
                    className="px-5 flex flex-col cursor-pointer group transition-colors w-fit"
                  >
                    <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
                      <MountainIcon
                        className={cn(
                          "text-gray-400 w-[18px] h-[18px] group-hover:text-pink-500"
                          // {
                          //   "fill-pink-500 text-pink-500":
                          //     optimisticLikeState.likedByCurrentUser,
                          // }
                        )}
                      />
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-pink-500">
                      <span>{`1.2 K`}</span>
                    </div>
                  </button>
                </form>
                <div>
                  <p className="inline-flex items-center text-xs  text-gray-500">
                    <span>Posted by </span>
                    <Link href={`/${"manoj"}`} className="ml-1 hover:underline">
                      {"manoj"}
                    </Link>
                  </p>
                  <Link href={"/post"}>
                    <p className="text-sm">Kodachadri, hill station</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="visited-on">
              <p className="text-sm">October,2023</p>
            </div>
            <div className="action">
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
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem>Delete Bucketlist</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="visited-section">
          <div className="border-l-4 border-blue-500 px-2">
            <h2>Visited</h2>
          </div>
          <div className="grid grid-cols-3"></div>
        </div>
      </div>

      <BucketListTable />
    </div>
  );
}
