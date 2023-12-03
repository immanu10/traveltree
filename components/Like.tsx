"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";

export function Like() {
  const supabase = createClient();

  const handleLike = async () => {
    const { data } = await supabase.auth.getSession();
    console.log(data);

    if (!data.session) {
      console.log("No session trigger Modal");
    } else {
      console.log("Session is present in client component! Trigger Like");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={handleLike}>
      <HeartIcon className="h-4 w-4" />
    </Button>
  );
}
