import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { AuthDialog } from "./auth-dialog";

export function UnAuthorizedLike({ count }: { count: number }) {
  return (
    <AuthDialog>
      <div
        role="button"
        className="flex items-center cursor-pointer group transition-colors w-fit"
      >
        <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
          <Heart
            className={cn(
              "text-muted-foreground w-[18px] h-[18px] group-hover:text-pink-500"
            )}
          />
        </div>
        <div className="text-xs text-muted-foreground group-hover:text-pink-500">
          <span>{count} buckets</span>
        </div>
      </div>
    </AuthDialog>
  );
}
