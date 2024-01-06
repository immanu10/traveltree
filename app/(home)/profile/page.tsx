import { UserNameForm } from "@/components/form/username";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { getInitialFromFullName } from "@/lib/utils";
import { Edit2Icon, EditIcon, PencilLineIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function Page({}: {}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id);

  if (!data) {
    notFound();
  }

  const { avatar_url, full_name, bio, username } = data[0];

  return (
    <div className="px-5 md:px-0">
      {username === null && (
        <div>
          <UserNameForm />
        </div>
      )}

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
