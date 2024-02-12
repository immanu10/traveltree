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
    return <p className="text-sm  text-muted-foreground">No Data</p>;
  return (
    <>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="relative w-64 h-64 border overflow-hidden rounded-md"
          >
            <Image
              src={item.image_url!}
              alt={`${item.name} picture`}
              className=""
              fill
              style={{
                objectFit: "cover",
              }}
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
    </>
  );
}

{
  /* <div className="px-2 w-40 h-40 border border-dashed border-primary rounded-md flex flex-col items-center justify-center">
<p className="text-xs font-medium  text-center ">
  Want to add more toys?
</p>
<p className="mt-2 text-xs text-muted-foreground">Coming soon...</p>
</div> */
}
