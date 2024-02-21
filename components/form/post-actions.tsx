"use client";

import { Loader2, MoreVertical, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { removePost } from "@/app/actions";
import { toast } from "sonner";

export function PostActions({
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
      const res = await removePost(id);
      setOpen(false);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setOpen(true)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {`${title ? title : "This"} will be removed from permanently.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={pending} onClick={handleContinue}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
