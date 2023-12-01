"use client";

import { Icons } from "../icons";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SigninForm() {
  const handleSigninWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback?next=/explore`,
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleSigninWithGoogle}>
      <Icons.google className="mr-2 w-4 h-4" /> Sign in with Google
    </Button>
  );
}
