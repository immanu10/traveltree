"use client";

import { useRouter } from "next/navigation";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SigninForm() {
  const [signInClicked, setSignInClicked] = useState(false);

  const handleSigninWithGoogle = async () => {
    setSignInClicked(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleSigninWithGoogle}
      disabled={signInClicked}
      className="w-full"
    >
      {signInClicked ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          <Icons.google className="mr-2 w-4 h-4" /> Sign in with Google
        </>
      )}
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
    <Button variant="ghost" onClick={handleLogout} className="w-full">
      Log Out
    </Button>
  );
}
