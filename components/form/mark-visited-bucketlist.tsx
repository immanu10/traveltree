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
const currentYear = new Date().getFullYear();
const LAST_TEN_YEARS = Array.from({ length: 11 }, (_, index) =>
  (currentYear - index).toString()
);
const formSchema = z.object({
  visited_month: z.enum(MONTHS),
  visited_year: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export function MarkVisitedBucketlist({ data }: { data: DataProps }) {
  const [pending, startTransisition] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormType) {
    console.log(values);

    startTransisition(async () => {
      //   const res = await removeBucketList(data.id);
      //   if (res.status !== 200) {
      // console.log("Erro", res);
      // toast message
      //   }
      //   console.log(res);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pt-4 pb-2 px-1">
          <Label className="text-xs">Visited in:</Label>
          <div className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="visited_month"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {MONTHS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visited_year"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {LAST_TEN_YEARS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="ml-auto flex gap-2 items-center">
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
