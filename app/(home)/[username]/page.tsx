import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { getInitialFromFullName } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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
    return <p className="text-destructive">No User found!</p>;
  }

  const { avatar_url, full_name, username, bio } = profiles[0];

  return (
    <div className="px-5 md:px-0">
      <div className="flex flex-col space-y-2 items-center my-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={avatar_url ? avatar_url : undefined}
            alt={full_name ? full_name : undefined}
          />
          <AvatarFallback>
            {full_name ? getInitialFromFullName(full_name) : ""}
          </AvatarFallback>
        </Avatar>
        <div className="max-w-sm text-center flex flex-col space-y-2 ">
          <div>
            <h1 className="font-semibold text-xl">{full_name}</h1>
            {username && (
              <p className="text-muted-foreground font-medium">@{username}</p>
            )}
          </div>
          <p className="text-sm">{bio}</p>
        </div>
      </div>
    </div>
  );
}
