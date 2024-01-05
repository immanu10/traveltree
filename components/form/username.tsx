"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(48, {
      message: "Username must be less than 48 characters.",
    }),
});

export function UserNameForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="p-4 shadow">
        <p className="text-center text-sm font-medium">
          Claim your username and let the world see your travel tree!
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex space-x-2 my-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="flex rounded-md">
                    <span className="bg-muted inline-flex flex-shrink-0 items-center rounded-l-md border border-r-0 px-3 text-sm">
                      travel.tree/
                    </span>
                    <Input
                      id="username"
                      placeholder="username"
                      className="rounded-l-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-6">
            Claim
          </Button>
        </form>
      </div>
    </Form>
  );
}
