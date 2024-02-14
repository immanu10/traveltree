"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, CopyIcon } from "lucide-react";

export function CopyToClipboardButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error(
        err instanceof Error ? err : new Error("Failed to copy text")
      );
    }
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={copyToClipboard}
    >
      {copied ? (
        <Check className="w-3 h-3 text-muted-foreground" />
      ) : (
        <CopyIcon className="w-3 h-3 text-muted-foreground" />
      )}
    </Button>
  );
}
