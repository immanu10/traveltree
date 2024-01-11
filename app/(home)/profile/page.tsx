import { EditProfile } from "@/components/form/edit-profile";
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

      <EditProfile initialData={{ username, full_name, bio, avatar_url }} />
    </div>
  );
}
