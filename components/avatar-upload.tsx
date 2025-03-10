"use client";

import { getInitialFromFullName } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Pen, Pencil } from "lucide-react";
import { uploadProfileAvatar } from "@/app/actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";

type AvatarUploadProps = {
  url: string | undefined;
  altText: string | undefined;
};

export function AvatarUpload({ url, altText }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [pending, startTransisition] = useTransition();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarFile(e.target.files[0]);
      e.target.value = "";
      setPreviewUrl(fileUrl);
      setShowPreviewModal(true);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }
  function handleClosePreviewModal() {
    setShowPreviewModal(false);
  }
  function handleSaveAvatar() {
    if (!avatarFile) return;
    const form = new FormData();
    form.append("avatarFile", avatarFile);
    startTransisition(async () => {
      const res = await uploadProfileAvatar(form);
      if (res.status === 200) {
        setShowPreviewModal(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => inputRef.current?.click()}
              className="relative w-fit cursor-pointer transition-colors hover:ring-2 hover:ring-muted-foreground hover:ring-offset-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Avatar className="h-20 w-20">
                <AvatarImage src={url} alt={altText} />
                <AvatarFallback>
                  {altText ? getInitialFromFullName(altText) : ""}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="absolute bottom-1 -right-2 h-6 py-2 px-2 text-xs rounded-full"
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>Change your avatar</TooltipContent>
        </Tooltip>
        <input
          ref={inputRef}
          type="file"
          name="pfp"
          id="pfp"
          accept="image/jpeg, image/png"
          className="absolute w-[1px] h-[1px] top-[-1000px] lef-[-1000px] opacity-0 overflow-hidden invisible"
          onChange={handleFileChange}
        />
      </div>
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent>
          <div className="p-2 mx-auto">
            <div className="max-w-[320px] mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img src={previewUrl} alt="preview-avatar" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClosePreviewModal}
            >
              Cancel
            </Button>
            <Button disabled={pending} onClick={handleSaveAvatar}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
