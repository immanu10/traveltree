"use client";

import { removeToy } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type ToyShowCaseProps = {
  item: {
    id: number;
    image_url: string | null;
    inserted_at: string;
    name: string | null;
    since: number | null;
    user_id: string;
  };
  isLoggedInUser: boolean;
};

export function ToyShowCase({ item, isLoggedInUser }: ToyShowCaseProps) {
  const [pending, startTransisition] = useTransition();

  const [open, setOpen] = useState(false);

  function handleContinue() {
    startTransisition(async () => {
      const res = await removeToy(item.id);
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
      <div className="relative w-full h-60 border overflow-hidden rounded-md">
        <AlertDialogTrigger asChild>
          {isLoggedInUser && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-secondary/80 text-destructive  hover:bg-secondary hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete Toy</span>
            </Button>
          )}
        </AlertDialogTrigger>
        <Image
          src={item.image_url!}
          alt={`${item.name} picture`}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute bottom-0 inset-x-0 w-full pt-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          <div className="text-white px-4 pb-2">
            <p className="font-bold text-lg text-ellipsis overflow-hidden">
              {item.name}
            </p>
            <p className="font-medium text-xs">Since: {item.since}</p>
          </div>
        </div>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`${
              item.name ? item.name : "This"
            } will be removed from your Toys.`}
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
