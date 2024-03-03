import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BatteryMedium,
  CheckCheck,
  ChevronDown,
  CopyIcon,
  MountainIcon,
  Trash2,
  Wifi,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { LikeVisual } from "./LikeVisual";

export function BentroGridFeatures({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "px-5 grid auto-rows-[20rem] grid-cols-1 md:grid-cols-2 gap-4",
        className
      )}
    >
      <div className="row-span-1 border border-border rounded-lg overflow-hidden">
        <GridItemOneFeature />
      </div>
      <div className="row-span-1 border border-border rounded-lg overflow-hidden">
        <GridItemTwoFeature />
      </div>
      <div className="row-span-2 md:col-span-1 border border-border rounded-lg overflow-hidden">
        <GridItemThreeFeature />
      </div>
      <div className="row-span-1 md:col-span-1 border border-border rounded-lg overflow-hidden">
        <GridItemFourFeature />
      </div>
      <div className="row-span-1 md:col-span-1 border border-border rounded-lg overflow-hidden">
        <GridItemFiveFeature />
      </div>
    </section>
  );
}

function GridItemOneFeature() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50 via-white">
      <div className="flex-1 flex items-center px-4 relative select-none">
        <div className="py-2  shadow-md flex flex-col gap-2 rounded-lg w-full bg-background relative">
          <div className="w-5/12 h-full absolute top-0 right-0 bg-gradient-to-l from-white rounded-lg"></div>

          <div className="px-4">
            <div className="inline text-xs text-muted-foreground font-medium">
              <span>Posted by @immanu10</span>
              <span className="mx-1 font-bold">&middot;</span>
              <span>16 Feb 2024</span>
            </div>
            <span className="block font-medium text-lg">Karnataka</span>
            <div className="mt-1 text-xs text-muted-foreground font-medium flex gap-1 items-center">
              <span>{`Best time to visit: `}</span>
              <Badge variant="secondary" className="font-medium">
                All months
              </Badge>
            </div>
            <div className="my-2  rounded-sm flex items-center text-xs">
              <span className="text-blue-500 hover:underline overflow-hidden text-ellipsis">
                maps.app.goo.gl/wPyLd3S8NZJawDRNA
              </span>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <CopyIcon className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="text-sm my-2">
              <span className="block text-justify whitespace-nowrap overflow-hidden text-ellipsis">
                One state, Mant Worlds
              </span>
            </div>
          </div>
          <div className="px-4">
            <LikeVisual />
          </div>
        </div>
      </div>
      <div className="p-4 rounded-lg">
        <h3 className="font-semibold">Explore and Create bucketlist</h3>
        <p className="text-muted-foreground text-sm">
          Just like the post and your bucketlist is ready.
        </p>
      </div>
    </div>
  );
}

function GridItemTwoFeature() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50">
      <div className="flex-1 pl-12 relative select-none">
        <div className="border-l-2 border-b-2 border-muted-foreground rounded-bl-xl w-full py-6 px-4 bg-background">
          <div className="w-full h-8 border border-input text-xs text-muted-foreground rounded-sm px-2 py-2">
            Title
          </div>
          <div className="mt-2 w-full h-12 border border-input text-xs text-muted-foreground rounded-sm px-2 py-2">
            Description
          </div>
          <div className="mt-2 w-full h-8 border border-input text-xs text-muted-foreground rounded-sm px-2 py-2">
            Map URL
          </div>
          <div className="flex mt-4 space-x-4">
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button size="sm">Submit</Button>
          </div>
        </div>
        <div className="w-full h-20 absolute top-0 inset-x-0 bg-gradient-to-b from-white"></div>
        <div className="w-20 h-full absolute right-0 inset-y-0 bg-gradient-to-l from-white"></div>
      </div>
      <div className="p-4 rounded-lg">
        <h3 className="font-semibold">Post your travel tales</h3>
        <p className="text-muted-foreground text-sm">
          Simple way to share and track your travel life.
        </p>
      </div>
    </div>
  );
}

function GridItemThreeFeature() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50 via-white">
      <div className="flex-1 flex mt-12 justify-center px-4 relative select-none">
        <div className="w-64 h-[32rem] border-x-2 border-t-2 border-muted-foreground rounded-t-xl flex flex-col bg-background">
          <div className="text-muted-foreground flex justify-between px-2 mt-2">
            <p className="text-xs font-medium">10:00</p>
            <div className="flex items-center space-x-3">
              <Wifi className="w-4 h-4" />
              <BatteryMedium className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 relative">
            <Image
              src="/profile.png"
              alt="profile-mockup"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full h-36 absolute bottom-0 inset-x-0 bg-gradient-to-t from-white"></div>
      </div>
      <div className="p-4 rounded-lg">
        <h3 className="font-semibold">Your traveltree profile</h3>
        <p className="text-muted-foreground text-sm">
          Create and customize your profile.
        </p>
      </div>
    </div>
  );
}

function GridItemFourFeature() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-50 via-white">
      <div className="flex-1 flex flex-col justify-center px-4 relative select-none">
        <div className="flex items-center justify-between">
          <div className="border-l-4 border-green-500 pl-2">
            <span className="block text-sm font-medium">Todo</span>
          </div>
          <div className="max-w-fit px-3 py-1.5 text-sm text-popover-foreground shadow-md rounded-md bg-background">
            Mark as visited
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="">
            <div className="inline text-xs text-gray-500">
              Posted by @immanu10
            </div>
            <div className="text-sm text-foreground font-medium text-ellipsis overflow-hidden whitespace-nowrap">
              Goa
            </div>
            <div className="text-accent-foreground text-xs text-ellipsis overflow-hidden whitespace-nowrap">
              We had best time of our life...
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <Button variant="ghost" size="icon" className="bg-accent">
              <CheckCheck className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-xs font-medium">Visited in:</div>
          <div className="grid grid-cols-4 gap-2 mt-1">
            <div className="h-9 border border-input text-xs text-muted-foreground rounded-sm px-2 py-2 flex items-center justify-between">
              <span>Month</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="h-9 border border-input text-xs text-muted-foreground rounded-sm px-2 py-2 flex items-center justify-between">
              <span>Year</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Button variant="secondary" size="sm" className="cursor-default">
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-background cursor-default"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="w-8 h-full absolute left-0 inset-y-0 bg-gradient-to-r from-white"></div>
        <div className="w-24 h-full absolute right-0 inset-y-0 bg-gradient-to-l from-white"></div>
      </div>
      <div className="p-4 rounded-lg">
        <h3 className="font-semibold">Bucketlist</h3>
        <p className="text-muted-foreground text-sm">
          Easy to track your todo, visited bucketlist.
        </p>
      </div>
    </div>
  );
}

function GridItemFiveFeature() {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center px-6 ">
      <h3 className="text-6xl text-center font-bold">
        Join
        <br />
        <span className="bg-gradient-to-b from-pink-600 via-pink-300  bg-clip-text text-transparent">
          traveltree.
        </span>
      </h3>
      <div className="w-full h-10 flex items-center text-sm bg-background rounded-md">
        <div className="bg-muted border border-r-0 font-medium max-w-fit py-2 px-3 rounded-l-md">
          traveltree.co/
        </div>
        <div className="flex-1  border  py-2 px-3 rounded-r-md bg-background text-muted-foreground">
          username
        </div>
      </div>
      <Link
        href="/signin"
        className={cn(buttonVariants({ size: "sm" }), "max-w-fit mx-auto")}
      >
        Let&apos;s go
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
}
