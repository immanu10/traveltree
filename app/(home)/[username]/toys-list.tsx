import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { ToyShowCase } from "./toy-showcase";

export async function ToysList({
  userId,
  isLoggedInUser,
}: {
  userId: string;
  isLoggedInUser: boolean;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("toys")
    .select("*")
    .eq("user_id", userId);

  if (error)
    return (
      <p className="text-sm  text-muted-foreground">Something went wrong</p>
    );
  if (data.length == 0)
    return (
      <div className="w-full h-36 flex items-center justify-center">
        <p className="text-sm text-center text-muted-foreground">No Data</p>
      </div>
    );
  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((item) => {
        return (
          <ToyShowCase
            key={item.id}
            item={item}
            isLoggedInUser={isLoggedInUser}
          />
        );
      })}
    </div>
  );
}
