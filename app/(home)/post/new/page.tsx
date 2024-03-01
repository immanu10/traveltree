import { NewPostForm } from "@/components/form/new-post";
import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/supabase/helpers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Traveltree.co | New Post";
const description =
  "Traveltree.co is a platform to create, discover, and track your bucket list. It also allows you to create, customize, and share your travel profile.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function CreatePostPage() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/");

  return (
    <div className="space-y-6 my-4 px-4 md:px-0">
      <div>
        <h3 className="text-lg font-medium">Creat new Travel post</h3>
        <p className="text-sm text-muted-foreground">
          Post new travel recommendation to the word.
        </p>
      </div>
      <Separator />
      <NewPostForm />
    </div>
  );
}
