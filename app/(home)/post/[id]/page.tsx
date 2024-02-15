import { FeedCard } from "@/components/feed-card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .rpc("get_post_by_id", {
      current_user_id: session ? session.user.id : null,
      current_post_id: Number(params.id),
    })
    .single();

  if (!data) {
    notFound();
  }

  return <FeedCard session={session} data={data} />;
}
