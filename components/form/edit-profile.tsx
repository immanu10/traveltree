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
import { createUsername } from "@/app/actions";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitialFromFullName } from "@/lib/utils";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(18, {
      message: "Username must be less than 18 characters.",
    }),
  full_name: z.string(),
  bio: z.string(),
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
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleShowForm = () => setShowForm(!showForm);

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
    startTransition(async () => {});
  }

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={avatar_url ? avatar_url : undefined}
            alt={full_name ? full_name : undefined}
          />
          <AvatarFallback>
            {full_name ? getInitialFromFullName(full_name) : ""}
          </AvatarFallback>
        </Avatar>
        {!showForm && (
          <div className="mt-2 max-w-sm text-center flex flex-col space-y-4">
            <div>
              <h1 className="font-semibold text-xl">{full_name}</h1>
              <p className="text-muted-foreground">
                {username ? `@${username}` : "no username set"}
              </p>
            </div>
            <p className="text-sm ">{bio}</p>
          </div>
        )}
        <div className="w-full max-w-xs mt-3">
          <div>
            {!showForm && (
              <Button
                variant="outline"
                className="w-full"
                onClick={toggleShowForm}
              >
                Edit Profile
              </Button>
            )}
            {showForm && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full flex flex-col space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            id="full_name"
                            placeholder="full_name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            id="username"
                            placeholder="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea id="bio" placeholder="bio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-2">
                    <Button type="submit" className="px-6">
                      {isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-6"
                      onClick={toggleShowForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
