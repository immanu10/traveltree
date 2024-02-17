import Link from "next/link";
import { Separator } from "./ui/separator";
import { Database } from "@/lib/supabase/types";
import { Like } from "./Like";
import { User } from "@supabase/supabase-js";
import { UnAuthorizedLike } from "./unauthorized-like";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";
import { formateBestTime } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { PostActions } from "./form/post-actions";

type FeedCardData =
  Database["public"]["Functions"]["get_posts_info"]["Returns"][0];

export async function FeedCard({
  data,
  sessionUser,
  isLoggedInUser,
}: {
  data: FeedCardData;
  sessionUser: User | null;
  isLoggedInUser?: boolean | undefined;
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
    <div className="border-b py-3 flex flex-col gap-2">
      <div className="px-4 md:px-0">
        <div className="flex justify-between">
          <div>
            <div className="inline text-xs text-muted-foreground font-medium">
              <span>Posted by </span>
              {username ? (
                <Link
                  href={`/${username}`}
                  className="hover:underline inline-block"
                >
                  @{username}
                </Link>
              ) : (
                <span>{full_name}</span>
              )}
            </div>
            <h3 className="font-medium text-lg">{title}</h3>
          </div>
          {isLoggedInUser && <PostActions id={id} title={title} />}
        </div>
        <div className="mt-1 text-xs text-muted-foreground font-medium flex gap-1 items-center">
          <p>{`Best time to visit: `}</p>
          <Badge variant="secondary" className="font-medium">
            {formateBestTime(best_months)}
          </Badge>
        </div>
        {map_url && (
          <div className="my-2  rounded-sm flex items-center text-xs">
            <a
              href={map_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline overflow-hidden text-ellipsis"
            >
              {map_url?.replace(/^https:\/\//i, "")}
            </a>
            <Separator orientation="vertical" className="h-4 mx-2" />
            <CopyToClipboardButton text={map_url} />
          </div>
        )}
        <div className="text-sm my-2 w-full">
          <p className="text-justify">{description}</p>
        </div>
      </div>
      <div className="px-4 md:px-0">
        {sessionUser ? (
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
