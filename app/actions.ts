"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";
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

  const { error } = await supabase.from("bucketlists").upsert(
    {
      user_id: session.user.id,
      post_id: values.post_id,
      is_liked: values.isLiked,
    },
    { onConflict: "user_id, post_id" }
  );

  if (error) return { status: 500, message: "Internal server error" };
  revalidatePath("/explore");
  return { status: 200, message: "Like/UnLike action Completed" };
}

export async function removeBucketList(bucketlist_id: number) {
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
    .from("bucketlists")
    .update({ is_liked: false })
    .eq("id", bucketlist_id);

  if (error) return { status: 500, message: "Internal server error" };
  revalidatePath("/bucketlist");
  return { status: 200, message: "Bucketlist Removed" };
}

export async function markAsTodoBucketList(bucketlist_id: number) {
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
    .from("bucketlists")
    .update({ is_completed: false, visited_month: null, visited_year: null })
    .eq("id", bucketlist_id);

  if (error) return { status: 500, message: "Internal server error" };
  revalidatePath("/bucketlist");
  return { status: 200, message: "Bucketlist moved to Todo" };
}

export async function markAsVisitedBucketList({
  bucketlist_id,
  month,
  year,
}: {
  bucketlist_id: number;
  month: Database["public"]["Enums"]["months_enum"];
  year: number;
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

  const { error } = await supabase
    .from("bucketlists")
    .update({ is_completed: true, visited_month: month, visited_year: year })
    .eq("id", bucketlist_id);

  if (error) return { status: 500, message: "Internal server error" };
  revalidatePath("/bucketlist");
  return { status: 200, message: "Bucketlist marked as completed" };
}

export async function uploadProfileAvatar(form: FormData) {
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

    const file = form.get("avatarFile") as File;

    const fileExt = file.name.split(".").pop();
    const filePath = `${session.user.id}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    if (uploadError) {
      throw uploadError;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_url: `https://sqvnokaivjagfnbngapa.supabase.co/storage/v1/object/public/avatars/${filePath}`,
      })
      .eq("id", session.user.id);

    if (!error) {
      revalidatePath("/profile");
      return { status: 200, message: "Avatar updated" };
    } else {
      return {
        status: 403,
        message: "Something went wrong!",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      message: "Something went wrong on server",
    };
  }
}
