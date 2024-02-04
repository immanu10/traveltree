import { cookies } from "next/headers";
import { ProgressBar } from "./progress-bar";
import { createClient } from "@/lib/supabase/server";

export async function BucketListProgress({ userId }: { userId: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("bucketlists")
    .select("is_completed")
    .eq("is_liked", true)
    .eq("user_id", userId);

  const visitedCount = data?.filter((item) => item.is_completed).length || 0;
  const totalBucketlist = data?.length || 0;

  if (error)
    return (
      <p className="text-sm text-muted-foreground">Something went wrong</p>
    );

  return <ProgressBar data={{ visitedCount, totalBucketlist }} />;
}
