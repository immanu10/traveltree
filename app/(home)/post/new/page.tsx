import { NewPostForm } from "@/components/form/new-post";
import { Separator } from "@/components/ui/separator";

export default function CreatePostPage() {
  return (
    <div className="space-y-6 my-4">
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
