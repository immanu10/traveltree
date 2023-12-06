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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const items = [
  {
    id: "jan",
    label: "Jan",
  },
  {
    id: "feb",
    label: "Feb",
  },
  {
    id: "mar",
    label: "Mar",
  },
  {
    id: "apr",
    label: "Apr",
  },
  {
    id: "may",
    label: "May",
  },
  {
    id: "jun",
    label: "Jun",
  },
  {
    id: "jul",
    label: "Jul",
  },
  {
    id: "aug",
    label: "Aug",
  },
  {
    id: "sep",
    label: "Sep",
  },
  {
    id: "oct",
    label: "Oct",
  },
  {
    id: "nov",
    label: "Nov",
  },
  {
    id: "dec",
    label: "Dec",
  },
] as const;

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  googleurl: z.string(),
  besttime: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function NewPostForm() {
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
    console.log(values);
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
                  placeholder="Tell us a little bit about yourself"
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
              <div className="mb-4">
                <FormLabel className="text-base">Best time to visit</FormLabel>
              </div>
              <div className="flex gap-2 flex-wrap">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="besttime"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          // className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormLabel
                            className={cn(
                              "transition-colors text-black font-normal inline-flex items-center border-2 border-muted rounded-3xl px-4 py-2 cursor-pointer hover:bg-accent",
                              {
                                "border-primary": field.value?.includes(
                                  item.id
                                ),
                              }
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                                className="peer sr-only"
                              />
                            </FormControl>
                            {item.label}
                            {/* <span
                              className={`text-gray-700 ${
                                field.value?.includes(item.id)
                                  ? "bg-blue-500 text-white"
                                  : ""
                              } px-3 py-1 rounded-lg`}
                            >
                              {item.label}
                            </span> */}
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
              <FormLabel>Google map link</FormLabel>
              <FormControl>
                <Input placeholder="google map link" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
