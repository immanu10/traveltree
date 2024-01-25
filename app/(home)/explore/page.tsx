import { FeedCard } from "@/components/feed-card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function ExplorePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: feedData } = await supabase
    .rpc("get_posts_info", {
      current_user_id: session ? session.user.id : null,
    })
    .order("inserted_at", { ascending: false });

  console.log(feedData?.toSorted());

  return (
    <div className="">
      <div className="border-b py-1 px-2">
        <div className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-normal my-2">
          Explore travel post from the community and Like them to add to your
          bucket list.
        </div>
      </div>
      {feedData?.map((item) => {
        return <FeedCard key={item.id} data={item} session={session} />;
      })}
    </div>
  );
}
