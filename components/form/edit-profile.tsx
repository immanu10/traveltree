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
import { useFormState } from "react-dom";
import { createUsername, updateProfile } from "@/app/actions";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitialFromFullName } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(18, {
      message: "Username must be less than 18 characters.",
    }),
  full_name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  bio: z
    .string()
    .max(160, {
      message: "Bio can not be more that 160 characters.",
    })
    .min(4, {
      message: "Bio must be at least 4 characters.",
    }),
});

export function EditProfile({
  initialData,
}: {
  initialData: {
    username: string | null;
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
  };
}) {
  const { username, full_name, bio, avatar_url } = initialData;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ?? "",
      full_name: full_name ?? "",
      bio: bio ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(async () => {
      const res = await updateProfile(values);

      console.log(res);
    });
  }

  return (
    <div className="flex flex-col mt-4 space-y-4">
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={avatar_url ? avatar_url : undefined}
          alt={full_name ? full_name : undefined}
        />
        <AvatarFallback>
          {full_name ? getInitialFromFullName(full_name) : ""}
        </AvatarFallback>
      </Avatar>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id="full_name" placeholder="Full Name" {...field} />
                </FormControl>
                <FormDescription>
                  Display Name for your travel profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input id="username" placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  Add your username to have your travel profile accessible on
                  traveltr.ee/username
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bio</FormLabel>

                <FormControl>
                  <Textarea id="bio" placeholder="Add a bio" {...field} />
                </FormControl>
                <FormDescription>
                  Add bio which suites your travel life
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-2">
            <Button type="submit" className="px-6">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
