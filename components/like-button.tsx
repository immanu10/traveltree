"use client";

import { MountainIcon } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { addAndRemoveBucketList } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LikeProps = {
  count: number;
  postId: number;
  likedByCurrentUser: boolean;
};
type TLike = Omit<LikeProps, "postId">;
type TAction = "like" | "dislike";

export function Like({ count, postId, likedByCurrentUser }: LikeProps) {
  const router = useRouter();
  const [pending, startTransisition] = useTransition();
  const [animate, setAnimate] = useState(false);

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
    setAnimate(true);
    startTransisition(async () => {
      // call server action
      const res = await addAndRemoveBucketList({
        post_id: postId,
        isLiked: !optimisticLikeState.likedByCurrentUser,
      });
      if (res.status !== 200) {
        toast.error(res.message);
      }
    });
    router.refresh();
  };

  return (
    <button
      onClick={handleLikeSubmit}
      className="flex items-center cursor-pointer group transition-colors w-fit"
    >
      <div
        className={cn(
          "relative flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-pink-50"
        )}
      >
        <svg
          className="absolute overflow-visible"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={cn(
              "text-pink-100 origin-center transition-all ease-in-out",
              optimisticLikeState.likedByCurrentUser &&
                animate &&
                "animate-[circle_.3s_forwards]"
            )}
            cx="12"
            cy="12"
            r="11.5"
            fill="transparent"
            strokeWidth="0"
            stroke="currentColor"
          />
        </svg>
        {optimisticLikeState.likedByCurrentUser ? (
          <MountainIcon
            className={cn(
              "w-[18px] h-[18px] fill-pink-500 text-pink-500",
              optimisticLikeState.likedByCurrentUser &&
                animate &&
                "animate-[scale_.35s_ease-in-out_forwards]"
            )}
          />
        ) : (
          <MountainIcon
            className={cn(
              "text-muted-foreground w-[18px] h-[18px] group-hover:text-pink-500",
              optimisticLikeState.likedByCurrentUser &&
                animate &&
                "animate-[scale_.35s_ease-in-out_forwards]"
            )}
          />
        )}
      </div>
      <div className="text-xs  text-muted-foreground group-hover:text-pink-500">
        <span>{optimisticLikeState.count} buckets</span>
      </div>
    </button>
  );
}
