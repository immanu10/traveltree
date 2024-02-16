import { FeedCard } from "@/components/feed-card";
import { getSessionUser } from "@/lib/supabase/helpers";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const sessionUser = await getSessionUser();

  const { data } = await supabase
    .rpc("get_post_by_id", {
      current_user_id: sessionUser?.id || null,
      current_post_id: Number(params.id),
    })
    .single();

  if (!data) {
    notFound();
  }

  return <FeedCard sessionUser={sessionUser} data={data} />;
}
