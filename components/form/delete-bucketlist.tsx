"use client";

import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Database } from "@/lib/supabase/types";
import { useState, useTransition } from "react";
import { removeBucketList } from "@/app/actions";

type DataProps = Database["public"]["Tables"]["bucketlists"]["Row"] & {
  posts:
    | (Database["public"]["Tables"]["posts"]["Row"] & {
        profiles: Pick<
          Database["public"]["Tables"]["profiles"]["Row"],
          "username" | "full_name"
        > | null;
      })
    | null;
};

export function DeleteBucketList({ data }: { data: DataProps }) {
  const [pending, startTransisition] = useTransition();

  const [open, setOpen] = useState(false);

  function handleContinue() {
    startTransisition(async () => {
      const res = await removeBucketList(data.id);
      setOpen(false);
      if (res.status !== 200) {
        console.log("Erro", res);
        // toast message
      }
      console.log(res);
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove bucketlist</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Remove bucketlist</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {data.posts?.title} will be removed from your bucketlist.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={pending} onClick={handleContinue}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
