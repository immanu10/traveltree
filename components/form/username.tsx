"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { createUsername } from "@/app/actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(18, {
      message: "Username must be less than 18 characters.",
    }),
});

export function UserNameForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(async () => {
      const res = await createUsername(values.username);
      if (res.status === 400) {
        form.setError("username", { message: res.message });
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <Form {...form}>
      <div className="p-4 shadow">
        <p className="text-sm font-normal">
          Claim your username and create your traveltree profile now.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex space-x-2 my-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="flex rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <span className="bg-muted inline-flex flex-shrink-0 items-center rounded-l-md border border-r-0  px-3 text-sm font-medium">
                      traveltree.co/
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
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Claim
          </Button>
        </form>
      </div>
    </Form>
  );
}
