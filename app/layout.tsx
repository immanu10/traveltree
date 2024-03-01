import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title =
  "Traveltree.co - Your Travel bucketlist and travel profile made easy.";
const description =
  "Traveltree.co is a platform to create, discover, and track your bucket list. It also allows you to create, customize, and share your travel profile.";

export const metadata: Metadata = {
  metadataBase: new URL("https://traveltree.co"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "Traveltree.co",
    title,
    description,
    url: "https://traveltree.co",
    images: [
      {
        type: "image/jpeg",
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Traveltree.co",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    site: "@immanu10x",
    description,
    creator: "@immanu10x",
    images: [
      {
        type: "image/jpeg",
        url: "/images/og.jpg",
        width: 1920,
        height: 1080,
        alt: "Traveltre.co",
      },
    ],
  },
  // Put images in app/
  // icons: {
  //   icon: '/icons/favicon-32x32.png',
  //   shortcut: '/icons/favicon.ico',
  //   apple: '/icons/apple-touch-icon.png',
  // },
  appleWebApp: {
    title,
    statusBarStyle: "default",
    startupImage: ["/icons/apple-icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
