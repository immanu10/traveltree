"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { MONTHS, cn } from "@/lib/utils";
import { useTransition } from "react";
import { createNewPost } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().max(42).min(2),
  description: z.string(),
  googleurl: z
    .string()
    .regex(
      new RegExp("^https://maps.app.goo.gl/[a-zA-Z0-9]+$"),
      "Invalid google map link"
    )
    .optional()
    .or(z.literal("")),
  besttime: z
    .array(z.enum(MONTHS))
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export function NewPostForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      googleurl: "",
      besttime: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await createNewPost(values);
      if (res.status === 403) {
        toast.error(res.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Title/ Place Name</FormLabel>
                <FormDescription>
                  Short title which fits the place or just put a name of the
                  place.
                </FormDescription>
              </div>
              <FormControl>
                <Input placeholder="Manali" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Description</FormLabel>
                <FormDescription>
                  Brief info about the place, helpful tips and guide when
                  visiting this place.
                </FormDescription>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Share little bit more about the place"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="besttime"
          render={() => (
            <FormItem>
              {/* <div className="mb-4"> */}
              <FormLabel className="text-base">Best time to visit</FormLabel>
              {/* </div> */}
              <div className="flex gap-2 flex-wrap">
                {MONTHS.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="besttime"
                    render={({ field }) => {
                      return (
                        <FormItem key={item}>
                          <FormLabel
                            className={cn(
                              "transition-colors font-normal inline-flex items-center border-2 border-muted rounded-md px-4 py-2 cursor-pointer hover:bg-accent",
                              {
                                "border-primary": field.value?.includes(item),
                              }
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                                className="peer sr-only"
                              />
                            </FormControl>
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="googleurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Google map link</FormLabel>
              <FormControl>
                <Input placeholder="google map link" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
