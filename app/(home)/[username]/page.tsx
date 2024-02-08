import { AddToy } from "@/components/add-toy";
import { BucketListProgress } from "@/components/bucketlist-progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { getInitialFromFullName } from "@/lib/utils";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Need to revisit: checkout auth.getUser() supabse function
async function getProfileOfCurrentSession(
  supabase: ReturnType<typeof createClient>
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profileData = null;
  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id);

    if (data) {
      profileData = data[0];
    }
  }
  return profileData;
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
    .eq("username", params.username);

  if (profiles?.length === 0 || !profiles) {
    // notFound() page
    return <p className="text-destructive text-center my-4">No User found!</p>;
  }
  const { avatar_url, full_name, username, bio, id } = profiles[0];

  const currentUser = await getProfileOfCurrentSession(supabase);

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-col items-center mt-4">
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
        {currentUser?.username === username && (
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
      <div className="mt-5">
        <p className="text-sm font-medium">Bucketlist Progress</p>
        <div className="mt-2">
          <Suspense
            fallback={
              <div className="w-full flex items-center gap-2">
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-1/12" />
              </div>
            }
          >
            <BucketListProgress userId={id} />
          </Suspense>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-medium">Toys</p>
        <div className="mt-2 flex gap-4">
          <AddToy />
          <div className="px-2 w-40 h-40 border border-dashed border-primary rounded-md flex flex-col items-center justify-center">
            <p className="text-xs font-medium  text-center ">
              Want to add more toys?
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
