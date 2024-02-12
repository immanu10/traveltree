import { Progress } from "./ui/progress";

export function ProgressBar({
  data,
}: {
  data: { visitedCount: number; totalBucketlist: number };
}) {
  const { visitedCount, totalBucketlist } = data;
  const progress = totalBucketlist ? (visitedCount / totalBucketlist) * 100 : 0;

  return (
    <div className="flex gap-2 items-center">
      <Progress value={progress} />
      <p className="text-sm">{`${visitedCount}/${totalBucketlist}`}</p>
    </div>
  );
}

// in future add animation to progress bar if required.
