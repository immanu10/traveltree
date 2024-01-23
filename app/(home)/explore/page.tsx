import { FeedCard } from "@/components/feed-card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function ExplorePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("posts")
    .select(`*,profiles("username")`)
    .order("inserted_at", { ascending: false });

  return (
    <div className="">
      <div className="border-b py-1 px-2">
        <div className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-normal my-2">
          Explore travel post from the community and Like them to add to your
          bucket list.
        </div>
      </div>
      {data?.map((item) => {
        return <FeedCard key={item.id} data={item} />;
      })}
    </div>
  );
}
