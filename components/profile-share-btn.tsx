"use client";

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export function ProfileShareBtn({ username }: { username: string | null }) {
  const handleShareClick = async () => {
    try {
      await navigator.share({
        title: "Traveltree.co",
        text: "Check out my traveltree.co profile. A platform to create, customize your travel profile and discover travel bucketlist.",
        url: `https://traveltree.co/${username}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (global.navigator && "share" in navigator) {
    return (
      <Button variant="outline" size="sm" onClick={handleShareClick}>
        <Share2 className="w-4 h-4" />
      </Button>
    );
  } else return null;
}
