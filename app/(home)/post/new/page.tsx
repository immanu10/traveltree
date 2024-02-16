import { NewPostForm } from "@/components/form/new-post";
import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/supabase/helpers";
import { redirect } from "next/navigation";

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
