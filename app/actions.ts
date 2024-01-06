"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createUsername(username: string) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        status: 401,
        message: "You must be logged in to do that.",
      };
    }
    const { error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", session.user.id);
    console.log(error);

    if (!error) {
      return {
        status: 200,
        message: "Username Created!",
      };
      revalidatePath("/profile");
    } else {
      return {
        status: 500,
        message: "omething went wrong!",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "omething went wrong!",
    };
  }

  // if (!/^[a-z0-9_]{3,18}$/.test(username)) {
  //     return {
  //       status: 400,
  //       body: {
  //         error:
  //           "Username should be between 3 and 18 characters, should be lowercase and should not contain any special characters.",
  //       },
  //     };
  //   }
}
