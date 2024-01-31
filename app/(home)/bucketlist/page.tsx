import { BucketListRow } from "@/components/bucketlist-row";
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

  const { data } = await supabase
    .from("bucketlists")
    .select(`*,posts(*,profiles(username,full_name))`)
    .eq("user_id", session.user.id)
    .order("inserted_at", { ascending: false });

  if (!data) {
    return <p className="text-red-500">No Bucketlist Added</p>;
  }

  return (
    <div className="my-4 px-5 md:px-0">
      <div className="border-l-4 border-gray-300 pl-2">
        <h1 className="text-lg">My Bucketlist</h1>
      </div>
      <Separator className="my-4" />

      <div className="mt-4 space-y-2">
        <div className="todo-section">
          <div className="border-l-4 border-green-500 pl-2 mb-2">
            <h3 className="text-sm font-light">Todo</h3>
          </div>
          <div>
            {data.map((item) => {
              return <BucketListRow key={item.id} data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
