"use client";

import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";

export function SigninForm() {
  const handleSigninWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleSigninWithGoogle}>
      <Icons.google className="mr-2 w-4 h-4" /> Sign in with Google
    </Button>
  );
}

export function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Button variant="secondary" onClick={handleLogout}>
      Log Out
    </Button>
  );
}
