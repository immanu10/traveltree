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

type FeedCardData = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: { username: string | null } | null;
  totalLikes: number;
};

export async function FeedCard({
  data,
  session,
}: {
  data: FeedCardData;
  session: Session | null;
}) {
  const {
    profiles,
    title,
    description,
    map_url,
    best_months,
    inserted_at,
    id,
    totalLikes,
  } = data;

  return (
    <div className="border-b py-3 flex flex-col gap-4">
      <div className="px-5">
        <p className="inline-flex items-center text-sm  text-gray-500">
          <span>Posted by</span>
          <Link
            href={`/${profiles?.username}`}
            className="ml-1 hover:underline"
          >
            {profiles?.username}
          </Link>
        </p>
        <h1 className="font-medium text-lg">{title}</h1>
        <div className="flex space-x-2 text-sm  text-gray-500 items-center">
          <p>Karnatak, India</p>
          <DotIcon className="w-3 h-3" />
          <p>{`Best time to visit: ${best_months?.toString()}`}</p>
        </div>
        <div className="my-2 py-2 rounded-sm flex space-x-2 h-8 items-center text-xs">
          <MapIcon className="w-3 h-3 text-blue-500" />
          {/* <Separator orientation="vertical" /> */}
          <Link href={map_url!} className="text-blue-500 hover:underline">
            {map_url}
          </Link>
          <Separator orientation="vertical" />

          <Button variant="ghost" size="icon" className="h-6 w-6">
            <CopyIcon className="w-3 h-3 text-gray-500" />
          </Button>
        </div>
        <div className="text-sm my-1 w-full">
          <p className="">{description}</p>
        </div>
      </div>
      {session ? (
        <Like count={totalLikes} postId={id} />
      ) : (
        <UnAuthorizedLike count={totalLikes} />
      )}
    </div>
  );
}
