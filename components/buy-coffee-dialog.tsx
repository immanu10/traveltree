import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
        <div className="font-medium text-sm flex flex-col items-center">
          <p>You buy me a coffee</p>
          <p>You get slots for your toys</p>
        </div>
        <div>
          <div className="flex justify-center  gap-6 px-4 py-2 rounded-md text-4xl">
            <div className="flex space-x-2 items-center">
              <p className="font-semibold">1</p>
              <p className="text-2xl text-muted-foreground font-medium">x</p>
              <p className="text-4xl">☕️</p>
            </div>
            <p>=</p>
            <div className="flex space-x-2 items-end">
              <p className="font-semibold">1</p>
              <p className="text-2xl text-muted-foreground font-semibold">
                slot
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            * Make sure to use same email id which is used in this platform
          </p>
        </div>
        <Button className="mt-2">Buy coffee</Button>
      </DialogContent>
    </Dialog>
  );
}
