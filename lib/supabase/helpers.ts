"use server";

import { cache } from "react";
import { createClient } from "./server";
import { cookies } from "next/headers";

// Reference: https://github.com/ElectricCodeGuy/SupabaseAuthWithSSR/blob/main/lib/client/supabase.ts
// React Cache: https://react.dev/reference/react/cache
// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
export const getSessionUser = cache(async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    return null;
  }
});

export const getProfileInfo = cache(async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
});
