import { DotIcon, MountainIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function FeedCard() {
  return (
    <div className="border-b py-2 flex flex-col gap-2">
      <div>
        <p className="inline-flex items-center text-sm  text-gray-500">
          <span>Posted by</span>
          <Link href="/manoj" className="ml-1 underline">
            @manoj
          </Link>
        </p>
        <h1 className="font-medium text-lg">Kodachadri, heaven on earth</h1>
        <div className="flex space-x-2 text-sm  text-gray-500 items-center">
          <p>Karnatak, India</p>
          <DotIcon className="w-3 h-3" />
          <p>Best Time: Apr, May</p>
        </div>
        <Link
          href="https://maps.app.goo.gl/gyagcBYHCd77PxgH7"
          className="text-sm text-blue-600 my-2"
        >
          https://maps.app.goo.gl/gyagcBYHCd77PxgH7
        </Link>
        <div className="text-sm my-2 w-full">
          <p className="">
            Kodachadri is a mountain peak with dense forests in the Western
            Ghats in South India, 78 km from Shimoga. book dmfdfml orler mer
            dmfdf dfdf mkk sss trek morning at 4am mmdfmdf mm mdfmdf dshimomd m
            loreme...more
          </p>
        </div>
      </div>
      <div className="flex space-x-1 items-center">
        <MountainIcon className="text-pink-300 w-6 h-6" />
        <p className="text-gray-600 text-sm">25 likes</p>
      </div>
    </div>
  );
}
