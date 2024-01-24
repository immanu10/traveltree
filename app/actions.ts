"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    if (!/^[a-z0-9_]{3,18}$/.test(username)) {
      return {
        status: 400,
        message:
          "Username should be lowercase and should not contain any special characters.",
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
    } else {
      return {
        status: 403,
        message: "Username already taken.",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong!",
    };
  }
}

export async function updateProfile(values: {
  username: string;
  full_name: string;
  bio: string;
}) {
  const { username, full_name, bio } = values;
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

  if (!/^[a-z0-9_]{3,18}$/.test(username)) {
    return {
      status: 400,
      message:
        "Username should be lowercase and should not contain any special characters.",
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username, full_name, bio })
    .eq("id", session.user.id);
  console.log(error);

  if (!error) {
    revalidatePath("/profile");
    redirect(`/${username}`);
  } else {
    return {
      status: 403,
      message: "Something went wrong!",
    };
  }
}

export async function createNewPost(values: {
  description: string;
  title: string;
  googleurl: string;
  besttime: (
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec"
  )[];
}) {
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

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: session.user.id,
        title: values.title,
        description: values.description,
        best_months: values.besttime,
        map_url: values.googleurl,
      },
    ])
    .select()
    .single();
  if (data && !error) {
    redirect(`/post/${data.id}`);
  } else {
    console.error(error);
    return {
      status: 403,
      message: "Something went wrong!",
    };
  }
}

export async function addAndRemoveBucketList(values: {
  post_id: number;
  isLiked: boolean;
}) {
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

  if (values.isLiked) {
    const { data, error } = await supabase
      .from("bucketlists")
      .insert([
        {
          user_id: session.user.id,
          post_id: values.post_id,
          is_liked: true,
        },
      ])
      .select()
      .single();

    console.log(data);

    if (error) return { status: 500, message: "Internal server error" };
    return { status: 200, message: "Added to Bucketlist" };
  } else {
    const { data, error } = await supabase
      .from("bucketlists")
      .update({ is_liked: false })
      .eq("post_id", values.post_id)
      .eq("user_id", session.user.id)
      .select()
      .single();

    console.log(data);

    if (error) return { status: 500, message: "Internal server error" };
    return { status: 200, message: "Removed Like" };
  }
}
