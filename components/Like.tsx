"use client";

import { HeartIcon, MountainIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Like({
  count,
  isLikedByCurrentUser = false,
}: {
  count: number;
  isLikedByCurrentUser: boolean;
}) {
  const [likeCount, setLikeCount] = useState(count);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

  const toggleLike = async () => {
    setIsLiked((prevLike) => !prevLike);
    setLikeCount((prevCount) => {
      if (!isLiked) return ++prevCount;
      return prevCount === 0 ? 0 : --prevCount;
    });
  };

  return (
    <div
      role="button"
      className="px-5 flex items-center cursor-pointer group transition-colors w-fit"
      onClick={toggleLike}
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
