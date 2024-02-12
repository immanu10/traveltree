import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { AddToy } from "./add-toy";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export async function AddToyAction({
  userId,
  maxLimit,
}: {
  userId: string;
  maxLimit: number | null;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { count, error } = await supabase
    .from("toys")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const totalAddToySlot = (maxLimit ?? 0) - (count ?? 0);
  return (
    <div className="flex gap-2">
      {totalAddToySlot > 0 ? (
        <AddToy slotCount={totalAddToySlot} />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
              <span className="ml-1  text-xs text-muted-foreground">
                0 slots left
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>0 slots left</DialogTitle>
              <DialogDescription>
                {"You've used all your slots for adding toys."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-medium text-center">Get it for</h2>
              <div className="text-center">
                <h4 className="text-6xl font-bold">$1</h4>
                <p className="text-sm font-medium text-muted-foreground">
                  Per slot
                </p>
              </div>
            </div>
            <Button className="">Buy now</Button>
          </DialogContent>
        </Dialog>
      )}
      <Button className="" size="sm">
        Buy
      </Button>
    </div>
  );
}
