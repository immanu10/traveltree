import { SigninForm } from "@/components/form/signin";
import { Icons } from "@/components/icons";
import { getSessionUser } from "@/lib/supabase/helpers";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const title = "Traveltree.co | Signin";

export const metadata: Metadata = {
  title,
};

export default async function SigninPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await getSessionUser();
  if (session) {
    redirect("/explore");
  }
  return (
    <div className="px-5 md:px-0 w-screen h-screen max-w-2xl flex flex-col mx-auto justify-center items-center space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <Link href="/">
          <Image
            src="/traveltree.svg"
            width={100}
            height={40}
            alt="traveltree logo"
            priority
          />
        </Link>
        <h1 className="text-3xl font-semibold">Authenticate</h1>
        <p className="font-medium text-muted-foreground">
          Sign in to traveltree.co
        </p>
      </div>
      <div className="w-full sm:w-[360px] grid gap-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground font-medium text-xs uppercase">
              Continue with
            </span>
          </div>
        </div>
        <SigninForm />
        {searchParams.error && (
          <p className="text-center text-sm text-destructive">
            {searchParams.error}
          </p>
        )}
        <p className="text-center text-muted-foreground text-sm">
          Platform to discover, track and share your travel journey!
        </p>
      </div>
    </div>
  );
}
