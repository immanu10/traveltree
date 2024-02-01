"use client";

import { MountainIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { cn } from "@/lib/utils";
import { addAndRemoveBucketList } from "@/app/actions";
import { useRouter } from "next/navigation";

type LikeProps = {
  count: number;
  postId: number;
  likedByCurrentUser: boolean;
};
type TLike = Omit<LikeProps, "postId">;
type TAction = "like" | "dislike";

export function Like({ count, postId, likedByCurrentUser }: LikeProps) {
  const [pending, startTransisition] = useTransition();
  //NOTE: useOptimistic is working correctly only when i revalidatePath in server action.
  const [optimisticLikeState, setOptimisticLikeState] = useOptimistic<
    TLike,
    TAction
  >({ count, likedByCurrentUser }, (state, action) => {
    if (action === "like")
      return { count: state.count + 1, likedByCurrentUser: true };
    else return { count: state.count - 1, likedByCurrentUser: false };
  });

  const handleLikeSubmit = async () => {
    // Call useOptimistic Action
    if (optimisticLikeState.likedByCurrentUser) {
      setOptimisticLikeState("dislike");
    } else setOptimisticLikeState("like");

    startTransisition(async () => {
      // call server action
      const res = await addAndRemoveBucketList({
        post_id: postId,
        isLiked: !optimisticLikeState.likedByCurrentUser,
      });
      if (res.status === 500) {
        console.log("Error", res.message);
        // error toast message
      } else {
        console.log("Success", res.message);
        // success toast message
      }
    });
  };

  return (
    <button
      onClick={handleLikeSubmit}
      className="px-5 flex items-center cursor-pointer group transition-colors w-fit"
    >
      <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
        <MountainIcon
          className={cn(
            "text-gray-400 w-[18px] h-[18px] group-hover:text-pink-500",
            {
              "fill-pink-500 text-pink-500":
                optimisticLikeState.likedByCurrentUser,
            }
          )}
        />
      </div>
      <div className="text-xs text-gray-400 group-hover:text-pink-500">
        <span>{`${optimisticLikeState.count} buckets`}</span>
      </div>
    </button>
  );
}
