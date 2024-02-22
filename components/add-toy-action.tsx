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
import { BuyCoffeeDialog } from "./buy-coffee-dialog";

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
        <BuyCoffeeDialog>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
            <span className="ml-1  text-xs text-muted-foreground">
              0 slots left
            </span>
          </Button>
        </BuyCoffeeDialog>
      )}
      <BuyCoffeeDialog>
        <Button className="" size="sm">
          Buy more
        </Button>
      </BuyCoffeeDialog>
    </div>
  );
}
