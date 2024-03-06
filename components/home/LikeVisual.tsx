"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

export function LikeVisual() {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  return (
    <button
      className="flex items-center cursor-pointer group transition-colors w-fit"
      onClick={() => {
        const nextIsLiked = !isLiked;
        setAnimate(true);
        setIsLiked(nextIsLiked);
      }}
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
              isLiked && animate && "animate-[circle_.3s_forwards]"
            )}
            cx="12"
            cy="12"
            r="11.5"
            fill="transparent"
            strokeWidth="0"
            stroke="currentColor"
          />
        </svg>
        {isLiked ? (
          <Heart
            className={cn(
              "w-[18px] h-[18px] fill-pink-500 text-pink-500",
              isLiked && animate && "animate-[scale_.35s_ease-in-out_forwards]"
            )}
          />
        ) : (
          <Heart
            className={cn(
              "text-muted-foreground w-[18px] h-[18px] group-hover:text-pink-500",
              isLiked && animate && "animate-[scale_.35s_ease-in-out_forwards]"
            )}
          />
        )}
      </div>
      <div className="text-xs font-medium text-muted-foreground group-hover:text-pink-500">
        <span>{isLiked ? "69" : "68"} buckets</span>
      </div>
    </button>
  );
}
