import { UserNameForm } from "@/components/form/username";
import { getProfileInfo } from "@/lib/supabase/helpers";
import { User } from "@supabase/supabase-js";

export async function ClaimUserNameCheck({
  sessionUser,
}: {
  sessionUser: User;
}) {
  const data = await getProfileInfo(sessionUser.id);
  if (data && data.username === null) return <UserNameForm />;
  return null;
}
