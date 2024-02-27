import { cn } from "@/lib/utils";
import { CopyIcon, MountainIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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
      <div className="row-span-1 border border-border rounded-lg overflow-hidden"></div>
      <div className="row-span-2 md:col-span-2 border border-border rounded-lg overflow-hidden"></div>
    </section>
  );
}

function GridItemOneFeature() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-pink-100 to-slate-50">
      <div className="flex-1 flex items-center px-4 relative select-none">
        <div className="py-2  shadow-lg flex flex-col gap-2 rounded-lg w-full bg-background relative">
          <div className="w-5/12 h-full absolute top-0 right-0 bg-gradient-to-l from-white rounded-lg"></div>

          <div className="px-4">
            <div className="flex justify-between">
              <div>
                <div className="inline text-xs text-muted-foreground font-medium">
                  <span>Posted by </span>
                  <span>@immanu10</span>
                  <span className="mx-1 font-bold">&middot;</span>
                  <span>22, feb 2023</span>
                </div>
                <h3 className="font-medium text-lg">Goa</h3>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground font-medium flex gap-1 items-center">
              <p>{`Best time to visit: `}</p>
              <Badge variant="secondary" className="font-medium">
                All months
              </Badge>
            </div>
            <div className="my-2  rounded-sm flex items-center text-xs">
              <span className="text-blue-500 hover:underline overflow-hidden text-ellipsis">
                maps.app.goo.gl/RSAKupEJX7d8tox9A
              </span>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <CopyIcon className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="text-sm my-2 w-full">
              <p className="text-justify whitespace-nowrap overflow-hidden text-ellipsis">
                Dummy text about goa, beach, boys outing, party culture
              </p>
            </div>
          </div>
          <div className="px-4">
            <button className="flex items-center cursor-pointer group transition-colors w-fit">
              <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
                <MountainIcon
                  className={cn(
                    "text-gray-500 w-[18px] h-[18px] group-hover:text-pink-500"
                  )}
                />
              </div>
              <div className="text-xs text-gray-500 group-hover:text-pink-500">
                <span>68 buckets</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 pt-2 pb-4 rounded-lg">
        <h3 className="font-semibold">Explore and Create bucketlist</h3>
        <p className="text-muted-foreground text-sm">
          Just like the post and your bucketlist is created.
        </p>
      </div>
    </div>
  );
}
