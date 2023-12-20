"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./icons";
import { Separator } from "./ui/separator";
import { SigninForm } from "./form/signin";

export function GetStarted() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Get Started</Button>
      </DialogTrigger>
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
          {/* <div className="flex rounded-md">
            <span className="bg-muted text-subtle inline-flex flex-shrink-0 items-center rounded-l-md border border-r-0 px-3 text-sm">
              travel.tree/
            </span>
            <Input
              id="username"
              placeholder="username"
              className="rounded-l-none"
            />
          </div> */}
          <SigninForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
