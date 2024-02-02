"use client";

import { CheckCheck, Loader2, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Database } from "@/lib/supabase/types";
import { useState, useTransition } from "react";
import { removeBucketList } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
const formSchema = z.object({
  visited_month: z.enum(MONTHS),
  visited_year: z.number(),
});

type FormType = z.infer<typeof formSchema>;

export function MarkVisitedBucketlist({ data }: { data: DataProps }) {
  const [pending, startTransisition] = useTransition();

  const [open, setOpen] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormType) {
    startTransisition(async () => {
      //   const res = await removeBucketList(data.id);
      setOpen(false);
      //   if (res.status !== 200) {
      // console.log("Erro", res);
      // toast message
      //   }
      //   console.log(res);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <CheckCheck className="h-4 w-4" />
              <span className="sr-only">Mark as visited</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Mark as visited</TooltipContent>
      </Tooltip>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Mark as Visited</DialogTitle>
          <DialogDescription>
            Select month and year when you visited {data.posts?.title}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="visited_month"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <FormLabel>Visited month</FormLabel>
                    <div className="col-span-3">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTHS.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
