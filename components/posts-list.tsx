import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { FeedCard } from "./feed-card";
import { getSessionUser } from "@/lib/supabase/helpers";

export async function PostsList({ userId }: { userId: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const sessionUser = await getSessionUser();

  const { data, error } = await supabase
    .rpc("get_all_posts_of_user", {
      current_user_id: sessionUser?.id || null,
      user_profile_id: userId,
    })
    .order("inserted_at", { ascending: false });

  if (error)
    return (
      <p className="text-sm text-center text-muted-foreground">
        Something went wrong
      </p>
    );
  if (data.length == 0 || !data)
    return (
      <p className="text-sm text-center text-muted-foreground">No Posts</p>
    );

  return data.map((item) => (
    <FeedCard key={item.id} sessionUser={sessionUser} data={item} />
  ));
}
