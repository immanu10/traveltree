import {
  BucketListRow,
  BucketListView,
  VisitedBucketListRow,
} from "@/components/bucketlist-row";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { MoreHorizontalIcon, MountainIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
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

  const { data } = await supabase
    .from("bucketlists")
    .select(`*,posts(*,profiles(username,full_name))`)
    .eq("user_id", session.user.id)
    .eq("is_liked", true)
    .order("inserted_at", { ascending: false });

  if (data === null) return <p className="text-lg text-center">No Data</p>;

  const todoData = data.filter((item) => !item.is_completed);
  const visitedData = data.filter((item) => item.is_completed);

  const emptyTodoBucketList = todoData.length === 0;
  const emptyVisitedBucketList = visitedData.length === 0;

  return (
    <div className="my-4">
      <div className="border-l-4 border-gray-300 pl-2 ml-5 md:ml-0">
        <h1 className="text-lg">My Bucketlist</h1>
      </div>
      <Separator className="my-4" />

      <div className="mt-4">
        <div className="border-l-4 border-green-500 pl-2 ml-5 md:ml-0">
          <h2 className="text-sm font-light">Todo</h2>
        </div>
        {emptyTodoBucketList ? (
          <p className="text-red-500 text-center mt-4">No Todo Bucketlist</p>
        ) : (
          <BucketListView data={todoData} />
        )}
      </div>

      <div className="mt-4">
        <div className="border-l-4 border-blue-500 pl-2 ml-5 md:ml-0">
          <h2 className="text-sm font-light">Visited</h2>
        </div>
        {emptyVisitedBucketList ? (
          <p className="text-red-500 text-center mt-4">No visited Bucketlist</p>
        ) : (
          visitedData.map((item) => (
            <VisitedBucketListRow key={item.id} data={item} />
          ))
        )}
      </div>
    </div>
  );
}
