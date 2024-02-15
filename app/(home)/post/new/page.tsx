import { NewPostForm } from "@/components/form/new-post";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

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
