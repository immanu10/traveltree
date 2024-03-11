import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("postid");
  if (!id) return NextResponse.json({ data: [] });

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("bucketlists")
    .select(`profiles(username,full_name,avatar_url)`)
    .eq("is_liked", true)
    .eq("post_id", id);
  if (error) {
    return NextResponse.json({ data: [] });
  }
  return NextResponse.json({ data });
}
