import { EditProfile } from "@/components/form/edit-profile";
import { getProfileInfo, getSessionUser } from "@/lib/supabase/helpers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({}: {}) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/");

  const data = await getProfileInfo(sessionUser.id);

  if (!data) {
    notFound();
  }

  const { avatar_url, full_name, bio, username } = data;

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
