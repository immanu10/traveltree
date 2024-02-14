"use client";

import { CheckCheck, Loader2, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Database } from "@/lib/supabase/types";
import { useState, useTransition } from "react";
import { markAsVisitedBucketList, removeBucketList } from "@/app/actions";
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
import { MONTHS } from "@/lib/utils";

const currentYear = new Date().getFullYear();
const LAST_TEN_YEARS = Array.from({ length: 11 }, (_, index) =>
  (currentYear - index).toString()
);
const formSchema = z.object({
  visited_month: z.enum(MONTHS),
  visited_year: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export function MarkVisitedBucketlist({
  id,
  closeCollapsible,
}: {
  id: number;
  closeCollapsible: () => void;
}) {
  const [pending, startTransisition] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormType) {
    console.log(values);

    startTransisition(async () => {
      const res = await markAsVisitedBucketList({
        bucketlist_id: id,
        month: values.visited_month,
        year: Number(values.visited_year),
      });
      if (res.status !== 200) {
        console.log("Erro", res);
        // toast message
      }
      console.log(res);
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
              <Button type="reset" variant="outline" onClick={closeCollapsible}>
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
