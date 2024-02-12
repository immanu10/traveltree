import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export async function ToysList({ userId }: { userId: string }) {
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
          <div
            key={item.id}
            className="relative w-full h-60 border overflow-hidden rounded-md"
          >
            <Image
              src={item.image_url!}
              alt={`${item.name} picture`}
              fill
              className="object-cover"
            />

            <div className="absolute bottom-0 inset-x-0 w-full pt-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <div className="text-white px-4 pb-2">
                <p className="font-bold text-lg text-ellipsis overflow-hidden">
                  {item.name}
                </p>
                <p className="font-medium text-xs">Since: {item.since}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
