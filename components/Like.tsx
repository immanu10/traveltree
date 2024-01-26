"use client";

import { HeartIcon, MountainIcon } from "lucide-react";
import { useEffect, useOptimistic, useState } from "react";
import { cn } from "@/lib/utils";
import { addAndRemoveBucketList } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";

type LikeProps = {
  count: number;
  postId: number;
  likedByCurrentUser: boolean;
};
type TLike = Omit<LikeProps, "postId">;

export function Like({ count, postId, likedByCurrentUser }: LikeProps) {
  // const [likeCount, setLikeCount] = useState(count);
  // const [isLiked, setIsLiked] = useState(likedByCurrentUser);

  // Todo: fixing useOptimistic, make some decision on isLiked field in Database
  const [optimisticLike, addAndRemoveOptimisticLike] = useOptimistic(
    { count, likedByCurrentUser },
    (state, newLike: TLike) => {
      console.log(newLike);
      return newLike;
    }
  );

  const handleLikeClick = async () => {
    // callOptimisticLike function
    addAndRemoveOptimisticLike(
      optimisticLike.likedByCurrentUser
        ? {
            count: optimisticLike.count === 0 ? 0 : optimisticLike.count - 1,
            likedByCurrentUser: !optimisticLike.likedByCurrentUser,
          }
        : {
            count: optimisticLike.count + 1,
            likedByCurrentUser: !optimisticLike.likedByCurrentUser,
          }
    );
    // call server action

    console.log({ optimisticLike });

    const res = await addAndRemoveBucketList({
      post_id: postId,
      isLiked: !optimisticLike.likedByCurrentUser,
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
              "fill-pink-500 text-pink-500": optimisticLike.likedByCurrentUser,
            }
          )}
        />
      </div>
      <div className="text-xs text-gray-400 group-hover:text-pink-500">
        <span>{`${optimisticLike.count} likes`}</span>
      </div>
    </div>
  );
}
