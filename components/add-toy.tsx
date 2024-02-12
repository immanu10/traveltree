"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Eye, Loader2, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { insertToToys } from "@/app/actions";

const currentYear = new Date().getFullYear();
const LAST_TEN_YEARS = Array.from({ length: 11 }, (_, index) =>
  (currentYear - index).toString()
);

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
  name: z.string().max(32).min(2),
  since: z.string(),
  picture: z
    .any()
    .refine((files) => files?.length == 1, "Picture is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpeg and .png files are accepted."
    ),
});

type FormType = z.infer<typeof formSchema>;

export function AddToy({ slotCount }: { slotCount: number }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransisition] = useTransition();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const formValues = form.watch();
  const [previewUrl, setPreviewUrl] = useFilePreview(formValues.picture);

  const fileRef = form.register("picture", { required: true });

  function handleCloseAndCancel(open: boolean) {
    form.reset();
    setPreviewUrl("");
    setOpen(open);
  }

  function onSubmit(values: FormType) {
    if (!values.picture) return; //show toast error

    const form = new FormData();
    form.append("image_url", values.picture[0]);
    form.append("name", values.name);
    form.append("since", values.since);

    startTransisition(async () => {
      const res = await insertToToys(form);
      console.log({ res });

      if (res?.status === 200) {
        setOpen(false);
      }

      // show toast message
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseAndCancel}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add
          <span className="ml-1  text-xs text-muted-foreground">
            {slotCount} slots left
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add your toy</DialogTitle>
              <DialogDescription>
                {
                  "Whether it's a newly purchased dream bike, car, or any item you use for travel."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-4 items-center grid-cols-4">
                    <FormLabel className="text-left">Name</FormLabel>
                    <div className="space-y-1 col-span-3">
                      <FormControl>
                        <Input id="name" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="since"
                render={({ field }) => (
                  <FormItem className="grid gap-4 items-center grid-cols-4">
                    <FormLabel className="text-left">Since</FormLabel>
                    <div className="space-y-1 col-span-3">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {LAST_TEN_YEARS.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem className="grid gap-4 items-center grid-cols-4">
                    <FormLabel className="text-left">Picture</FormLabel>
                    <div className="space-y-1 col-span-3">
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          {...fileRef}
                          accept="image/jpeg, image/png"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid gap-4 items-center grid-cols-4">
                <p className="text-sm font-medium">Preview</p>
                <div className="relative col-span-3 h-44 border overflow-hidden rounded-md flex items-center justify-center">
                  {previewUrl ? (
                    //  eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="preview-avatar"
                      className="w-full h-full max-h-full max-w-full"
                    />
                  ) : (
                    <p className="text-muted-foreground text-lg font-extralight text-center">
                      No Image
                    </p>
                  )}
                  <div className="absolute bottom-0 inset-x-0 w-full pt-4  bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <div className="text-white px-4 py-2">
                      <p className="font-bold text-lg text-ellipsis overflow-hidden">
                        {formValues.name ? formValues.name : "Name"}
                      </p>
                      <p className="font-medium text-xs">
                        Since: {formValues.since ? formValues.since : "Year"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleCloseAndCancel(false)}
              >
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

function useFilePreview(
  file: FileList
): [string, Dispatch<SetStateAction<string>>] {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    } else {
      setImgSrc("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return [imgSrc, setImgSrc];
}
