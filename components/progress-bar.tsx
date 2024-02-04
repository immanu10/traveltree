"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export function ProgressBar({
  data,
}: {
  data: { visitedCount: number; totalBucketlist: number };
}) {
  const { visitedCount, totalBucketlist } = data;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newProgress = totalBucketlist
        ? (visitedCount / totalBucketlist) * 100
        : 0;
      setProgress(newProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, [visitedCount, totalBucketlist]);

  return (
    <div className="flex gap-2 items-center">
      <Progress value={progress} />
      <p className="text-sm">{`${visitedCount}/${totalBucketlist}`}</p>
    </div>
  );
}
