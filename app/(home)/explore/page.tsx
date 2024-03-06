import { FeedCard } from "@/components/feed-card";
import { IntroBanner } from "@/components/layout/intro-banner";
import { getSessionUser } from "@/lib/supabase/helpers";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function ExplorePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const sessionUser = await getSessionUser();

  const { data: feedData } = await supabase
    .rpc("get_posts_info", {
      current_user_id: sessionUser?.id || null,
    })
    .order("inserted_at", { ascending: false });

  return (
    <div className="">
      <IntroBanner />
      {feedData?.map((item) => {
        return <FeedCard key={item.id} data={item} sessionUser={sessionUser} />;
      })}
    </div>
  );
}
