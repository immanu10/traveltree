import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export function BuyCoffeeDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Need more slots?</DialogTitle>
          <DialogDescription>
            {"You can support me and get slots for your toys."}
          </DialogDescription>
        </DialogHeader>
        <div className="relative min-h-[250px]">
          <Image
            src="/tradememe.jpg"
            fill
            alt="tradememe"
            className="object-contain"
            priority
          />

          <div className="text-white text-3xl font-bold absolute bottom-0 inset-x-0 flex justify-center">
            <h3 className="text-center">
              1 <span className="text-sm">x</span> ☕️ = 1 slot
            </h3>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mt-0.5">
            * Make sure to use same email id which is used in this platform.
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            * Refresh the page once done with the payment.
          </p>
        </div>
        <a
          href={"https://www.buymeacoffee.com/immanu10"}
          target="_blank"
          className={cn(buttonVariants(), "h-12 text-lg font-semibold")}
        >
          <Icons.buymeacoffee className="mr-2" />
          Buy me a coffee
        </a>
      </DialogContent>
    </Dialog>
  );
}
