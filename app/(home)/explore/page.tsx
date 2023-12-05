import { UserNameForm } from "@/components/form/username";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="">
      <p>Update your Username to create tree</p>
      <UserNameForm />
      <div className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-normal my-2">
        Explore travel post from community and Like them to add to your bucket
        list.
      </div>
    </div>
  );
}
