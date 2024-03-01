import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <LoadingFeedCard />
      <LoadingFeedCard />
      <LoadingFeedCard />
    </div>
  );
}

function LoadingFeedCard() {
  return (
    <div className="border-b py-3 flex flex-col gap-2">
      <div className="px-4 md:px-0">
        <Skeleton className="h-3 w-24 rounded-none" />
        <Skeleton className="mt-2 h-6 w-40 rounded-none" />
        <Skeleton className="mt-4 w-full h-24 rounded-none" />
      </div>
      <div className="px-4 md:px-0 mt-2 flex items-center">
        <Skeleton className="w-8 h-8 rounded-none" />
        <Skeleton className="ml-2 w-20 h-4 rounded-none" />
      </div>
    </div>
  );
}
