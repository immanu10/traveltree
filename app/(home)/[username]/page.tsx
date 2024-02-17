import { BucketListProgress } from "@/components/bucketlist-progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { getInitialFromFullName } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { ToysList } from "./toys-list";
import { AddToyAction } from "@/components/add-toy-action";
import { PostsList } from "@/components/posts-list";
import { getProfileInfo, getSessionUser } from "@/lib/supabase/helpers";

async function getProfileOfCurrentSession() {
  const sessionUser = await getSessionUser();

  if (sessionUser) {
    const data = await getProfileInfo(sessionUser.id);
    return data;
  }
  return null;
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profiles) {
    return (
      <p className="text-destructive text-center my-4">
        {"This account doesn't exist"}
      </p>
    );
  }
  const { avatar_url, full_name, username, bio, id, max_toy_limit } = profiles;

  const currentUser = await getProfileOfCurrentSession();
  const isLoggedInUser = currentUser?.username === username;

  return (
    <div className="">
      <div className="px-4 md:px-0 flex flex-col items-center mt-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={avatar_url ? avatar_url : undefined}
            alt={full_name ? full_name : undefined}
          />
          <AvatarFallback>
            {full_name ? getInitialFromFullName(full_name) : ""}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 max-w-sm text-center flex flex-col space-y-4">
          <div>
            <h1 className="font-semibold text-xl">{full_name}</h1>
            <p className="text-muted-foreground">
              {username ? `@${username}` : "no username set"}
            </p>
          </div>
          <p className="text-sm ">{bio}</p>
        </div>
        {isLoggedInUser && (
          <div className="w-full max-w-xs mt-3">
            <Link
              href="/profile"
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              Edit Profile
            </Link>
          </div>
        )}
      </div>
      <div className="px-4 md:px-0 my-12">
        <p className="text-sm font-medium">Bucketlist Progress</p>
        <div className="mt-2">
          <Suspense
            fallback={
              <div className="w-full flex items-center gap-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </div>
            }
          >
            <BucketListProgress userId={id} />
          </Suspense>
        </div>
      </div>
      <div className="px-4 md:px-0 my-12">
        <div className="flex justify-between">
          <p className="text-sm font-medium">Toys</p>
          {isLoggedInUser && (
            <Suspense
              fallback={
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20 rounded-md" />
                  <Skeleton className="h-9 w-16 rounded-md" />
                </div>
              }
            >
              <AddToyAction userId={id} maxLimit={max_toy_limit} />
            </Suspense>
          )}
        </div>
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Skeleton className="w-full h-60 border rounded-md" />
                <Skeleton className="w-full h-60 border rounded-md" />
              </div>
            }
          >
            <ToysList userId={id} isLoggedInUser={isLoggedInUser} />
          </Suspense>
        </div>
      </div>
      <div className="my-12">
        <p className="px-4 md:px-0 text-sm font-medium">Posts</p>
        <div className="mt-2">
          <Suspense fallback={<Skeleton className="h-12 w-full" />}>
            <PostsList userId={id} isLoggedInUser={isLoggedInUser} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
