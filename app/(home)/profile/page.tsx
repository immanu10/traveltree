import { EditProfile } from "@/components/form/edit-profile";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
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
    .eq("id", session.user.id)
    .single();

  if (!data) {
    notFound();
  }

  const { avatar_url, full_name, bio, username } = data;

  return (
    <div className="px-5 md:px-0">
      {username && (
        <div className="flex justify-center">
          <Link
            href={`/${username}`}
            className={buttonVariants({
              variant: "link",
              className: "my-2 underline",
            })}
          >{`Your travel tree : traveltr.ee/${username}`}</Link>
        </div>
      )}

      <EditProfile initialData={{ username, full_name, bio, avatar_url }} />
    </div>
  );
}
