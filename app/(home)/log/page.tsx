import { NewTravelLog } from "@/components/form/new-travel-log";
import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/supabase/helpers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Traveltree.co | Log your day";
const description =
  "Traveltree.co is a platform to create, discover, and track your bucket list. It also allows you to create, customize, and share your travel profile.";

export const metadata: Metadata = {
  title,
  description,
};

export default async function CreateLogPage() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/signin");

  return (
    <div className="space-y-6 my-4 px-4 md:px-0">
      <div>
        <h3 className="text-lg font-medium">Log your travel day</h3>
        <p className="text-sm text-muted-foreground">
          Get beautiful heatmap visualizer for your travel logs.
        </p>
      </div>
      <Separator />
      <NewTravelLog />
      <div className="">
        <h4 className="font-semibold text-sm">Your travel Commits/heatmap</h4>
      </div>
    </div>
  );
}
