import { CopyIcon, DotIcon, MapIcon, MountainIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Database } from "@/lib/supabase/types";
import { Like } from "./Like";
import { Session } from "@supabase/supabase-js";
import { UnAuthorizedLike } from "./unauthorized-like";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type FeedCardData =
  Database["public"]["Functions"]["get_posts_info"]["Returns"][0];

export async function FeedCard({
  data,
  session,
}: {
  data: FeedCardData;
  session: Session | null;
}) {
  const {
    id,
    username,
    full_name,
    title,
    description,
    best_months,
    map_url,
    total_likes,
    liked_by_current_user,
  } = data;

  return (
    <div className="border-b py-3 flex flex-col gap-4">
      <div className="px-5 md:px-0">
        <div className="inline text-sm text-gray-500">
          <span>Posted by </span>
          {username ? (
            <Link
              href={`/${username}`}
              className="hover:underline inline-block"
            >
              {username}
            </Link>
          ) : (
            <span>{full_name}</span>
          )}
        </div>
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex space-x-2 text-sm  text-gray-500 items-center">
          <p>Karnatak, India</p>
          <DotIcon className="w-3 h-3" />
          <p>{`Best time to visit: ${best_months?.toString()}`}</p>
        </div>
        <div className="my-2 py-2 rounded-sm flex space-x-2 h-8 items-center text-xs">
          <MapIcon className="w-3.5 h-3.5 text-blue-500" />
          {/* <Separator orientation="vertical" /> */}
          <a
            href={map_url!}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            {map_url}
          </a>

          <Separator orientation="vertical" />

          <Button variant="ghost" size="icon" className="h-6 w-6">
            <CopyIcon className="w-3.5 h-3.5 text-gray-500" />
          </Button>
        </div>
        <div className="text-sm my-1 w-full">
          <p className="">{description}</p>
        </div>
      </div>
      <div className="px-4 md:px-0">
        {session ? (
          <Like
            count={total_likes}
            postId={id}
            likedByCurrentUser={liked_by_current_user}
          />
        ) : (
          <UnAuthorizedLike count={total_likes} />
        )}
      </div>
    </div>
  );
}
