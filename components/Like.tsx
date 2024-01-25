"use client";

import { HeartIcon, MountainIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { addAndRemoveBucketList } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";

export function Like({
  count,
  postId,
  likedByCurrentUser,
}: {
  count: number;
  postId: number;
  likedByCurrentUser: boolean;
}) {
  const [likeCount, setLikeCount] = useState(count);
  const [isLiked, setIsLiked] = useState(likedByCurrentUser);

  const handleLikeClick = async () => {
    // call server action
    console.log({ isLiked });

    const res = await addAndRemoveBucketList({
      post_id: postId,
      isLiked: !isLiked,
    });
    setIsLiked((prevLike) => !prevLike);
    setLikeCount((prevCount) => {
      if (!isLiked) return ++prevCount;
      return prevCount === 0 ? 0 : --prevCount;
    });
    if (res.status === 500) {
      console.log("Error", res.message);
      // toast message
    }
    //TODO: useOptimistic to update like button state before server action finishes executing on server
  };

  return (
    <div
      role="button"
      className="px-5 flex items-center cursor-pointer group transition-colors w-fit"
      onClick={handleLikeClick}
    >
      <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
        <MountainIcon
          className={cn(
            "text-gray-400 w-[18px] h-[18px] group-hover:text-pink-500",
            {
              "fill-pink-500 text-pink-500": isLiked,
            }
          )}
        />
      </div>
      <div className="text-xs text-gray-400 group-hover:text-pink-500">
        <span>{`${likeCount} likes`}</span>
      </div>
    </div>
  );
}
