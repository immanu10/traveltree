"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./icons";
import { SigninForm } from "./form/signin";

export function AuthDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center py-6">
            <Icons.logo />
          </div>
          <DialogTitle>Sign in to traveltree</DialogTitle>
          <DialogDescription>
            Platform to discover, track and share your travel journey!
          </DialogDescription>
        </DialogHeader>
        <div className="py-12">
          <SigninForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
