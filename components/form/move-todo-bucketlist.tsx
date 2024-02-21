"use client";

import { Check, Loader2 } from "lucide-react";
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
import { useState, useTransition } from "react";
import { markAsTodoBucketList } from "@/app/actions";
import { toast } from "sonner";

export function MoveTodoBucketList({
  id,
  title,
}: {
  id: number;
  title: string | null | undefined;
}) {
  const [pending, startTransisition] = useTransition();

  const [open, setOpen] = useState(false);

  function handleContinue() {
    startTransisition(async () => {
      const res = await markAsTodoBucketList(id);
      setOpen(false);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Check className="h-4 w-4" />
              <span className="sr-only">Move to todo</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Move to todo</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`${title ? title : "This"} will be moved back to Todo bucketlist.`}
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
