import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

export function BucketListTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Travel Post</TableHead>
          <TableHead>Visited on</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="">
          <TableCell className="font-medium w-[200px] max-w-[200px]  overflow-hidden text-ellipsis whitespace-nowrap">
            <div className="flex w-full space-x-2">
              <form action="">
                <button
                  type="submit"
                  className="flex flex-col cursor-pointer group transition-colors w-fit"
                >
                  <div className="w-[34px] h-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10">
                    <MountainIcon
                      className={cn(
                        "text-gray-400 w-[18px] h-[18px] group-hover:text-pink-500"
                        // {
                        //   "fill-pink-500 text-pink-500":
                        //     optimisticLikeState.likedByCurrentUser,
                        // }
                      )}
                    />
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-pink-500">
                    <span>{`1.2 K`}</span>
                  </div>
                </button>
              </form>
              <div className="w-full">
                <p className="inline-flex items-center text-xs  text-gray-500">
                  <span>Posted by </span>
                  <Link href={`/${"manoj"}`} className="ml-1 hover:underline">
                    {"manoj"}
                  </Link>
                </p>
                <Link href={"/post"}>
                  <p className="text-sm m overflow-hidden whitespace-nowrap text-ellipsis">
                    Kodachadri, hill station Kodachadri, hill statioKodachadri,
                    hill statioKodachadri, hill statioKodachadri, hill statio
                  </p>
                </Link>
              </div>
            </div>
          </TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
