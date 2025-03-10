import {
  TodoBucketListView,
  VisitiedBucketListView,
} from "@/components/bucketlist-view";

import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/supabase/helpers";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const title = "Traveltree.co | Bucketlist";
const description =
  "Traveltree.co is a platform to create, discover, and track your bucket list. It also allows you to create, customize, and share your travel profile.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function Page() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("bucketlists")
    .select(`*,posts(*,profiles(username,full_name))`)
    .eq("user_id", sessionUser.id)
    .eq("is_liked", true)
    .order("inserted_at", { ascending: false });

  if (data === null) return <p className="text-lg text-center">No Data</p>;

  const todoData = data.filter((item) => !item.is_completed);
  const visitedData = data.filter((item) => item.is_completed);

  return (
    <div className="my-4">
      <div className="border-l-4 border-muted-foreground/60 pl-2 ml-5 md:ml-0">
        <h1 className="text-lg font-medium text-muted-foreground/90">
          My Bucketlist
        </h1>
      </div>
      <Separator className="my-4" />

      <div className="mt-4">
        <div className="border-l-4 border-green-500 pl-2 ml-5 md:ml-0">
          <h2 className="text-sm font-medium text-green-600">Todo</h2>
        </div>

        <TodoBucketListView data={todoData} />
      </div>

      <div className="mt-4">
        <div className="border-l-4 border-blue-500 pl-2 ml-5 md:ml-0">
          <h2 className="text-sm font-medium text-blue-600">Visited</h2>
        </div>
        <VisitiedBucketListView data={visitedData} />
      </div>
    </div>
  );
}
