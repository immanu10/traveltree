import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
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
  console.log({ params, searchParams });

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
    .select("*,posts(*)")
    .eq("user_id", session.user.id);

  if (!data) {
    return <p className="text-red-500">No Bucketlist Added</p>;
  }

  return (
    <div className="my-4">
      {/* <h1>BucketList - {searchParams.status}</h1>
      <nav className={cn("flex space-x-2")}>
        {["todo", "visited"].map((item, i) => (
          <Link
            key={i}
            href={`/${params.username}/bucketlist?status=${item}`}
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
      </nav> */}
      <div className="border-l-4 border-gray-300 px-2">
        <h1 className="text-xl">Bucketlist</h1>
      </div>
      <div className="mt-4">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.posts?.title}</p>
              <a
                href={item.posts?.map_url!}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline text-xs"
              >
                {item.posts?.map_url}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
