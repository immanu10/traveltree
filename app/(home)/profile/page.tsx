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

  const { avatar_url, full_name, bio, username, id } = data;

  return (
    <div className="px-5 md:px-0">
      {username && (
        <div className="flex justify-center items-center space-x-2 my-4">
          <p className="text-sm">For more customization visit:</p>
          <Link
            href={`/${username}`}
            className="text-sm font-medium underline underline-offset-4"
          >
            {`traveltree.co/${username}`}
          </Link>
        </div>
      )}

      <EditProfile initialData={{ username, full_name, bio, avatar_url }} />
    </div>
  );
}
