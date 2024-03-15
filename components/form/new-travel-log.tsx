"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NewTravelLog() {
  return (
    <div>
      <div className="border-l-4 border-muted-foreground/60 pl-2">
        <p className="font-semibold">Today, {new Date().toDateString()}</p>
      </div>
      <div className="w-full flex items-center space-x-4 mt-4">
        <Input placeholder="Search..." className="w-10/12" />
        <Button className="flex-1">Log</Button>
      </div>
    </div>
  );
}
