"use client";

import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { X } from "lucide-react";

export function IntroBanner() {
  const [banner, setBanner] = useLocalStorage("introbanner", true);

  if (!banner) return null;
  return (
    <div className="border-b sticky z-50 top-16 inset-x-0">
      <div className="flex justify-between items-start md:items-center  bg-gray-100 px-3 py-1 text-sm font-normal">
        <p className="w-11/12">
          Explore travel post from the community and Like them to add to your
          bucket list.
        </p>
        <button
          onClick={() => {
            setBanner(false);
          }}
          className="text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
