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
import Image from "next/image";

export function AuthDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center py-6">
            <Image
              src="/traveltree.svg"
              width={80}
              height={40}
              alt="traveltree logo"
              priority
            />
          </div>
          <DialogTitle>Sign in to traveltree.co</DialogTitle>
          <DialogDescription>
            Platform to discover, track and share your travel journey!
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 grid gap-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-muted-foreground font-medium text-xs uppercase">
                Continue with
              </span>
            </div>
          </div>
          <SigninForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
