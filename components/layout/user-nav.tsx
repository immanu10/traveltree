import { getInitialFromFullName } from "@/lib/utils";
import { Logout } from "../form/signin";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { getProfileInfo } from "@/lib/supabase/helpers";

export async function UserNav({ sessionUser }: { sessionUser: User }) {
  const data = await getProfileInfo(sessionUser.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data?.avatar_url || undefined}
              alt={data?.full_name || undefined}
            />
            <AvatarFallback>
              {data?.full_name ? getInitialFromFullName(data?.full_name) : ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.full_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {sessionUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.username && (
          <DropdownMenuItem>
            <Link
              href={`/${data.username}`}
              className="h-full w-full flex items-center"
            >
              <span className="overflow-hidden text-ellipsis">
                Your Tree
                <span className="ml-1 text-muted-foreground">
                  {`( @${data.username} )`}
                </span>
              </span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href="/profile" className="h-full w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/bucketlist" className="h-full w-full">
            My Bucketlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
