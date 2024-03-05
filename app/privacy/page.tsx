import Footer from "@/components/layout/footer";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "Traveltree.co | Privacy Policy";

export const metadata: Metadata = {
  title,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl min-h-screen mx-auto flex flex-col">
      <header className="sticky border-b top-0 z-50 w-full  bg-background">
        <div className="flex items-center h-16 px-4 md:px-0">
          <Link href="/">
            <Image
              src="/traveltree.svg"
              width={80}
              height={40}
              alt="traveltree logo"
              priority
            />
          </Link>
        </div>
      </header>
      <main className="w-full flex flex-col px-4 md:px-0">
        <h2 className="font-semibold text-xl my-2">Privacy Policy</h2>
        <p className="">
          This policy is effective as of{" "}
          <span className="font-medium">04 Mar 2024</span>.
        </p>
        <p className="my-3">
          Welcome to{" "}
          <span className="font-medium text-muted-foreground underline underline-offset-4">
            <Link href="/">traveltree.co</Link>
          </span>{" "}
          (&quot;the Site&quot;). Your privacy is important to us. This Privacy
          Policy outlines the types of information we collect from you, how we
          use it, and the steps we take to ensure its protection.
        </p>
        <h3 className="font-semibold text-lg my-2">Information Collection</h3>
        <p className="my-2">
          For a better experience, We use Google Authentication as sign-in
          option. We access basic profile information from your Google account,
          such as your email address, name, and profile picture. Additionally,
          we utilize Supabase as storage option for your data.
        </p>
        <h3 className="font-semibold text-lg my-2">Use of Information</h3>
        <p className="my-2">
          We only use the information which you provide for the basic
          functioning of this website.
        </p>
        <h3 className="font-semibold text-lg my-2">Third-Party Services</h3>
        <p className="my-2">
          The Service may integrate with third-party services such as Google
          OAuth and Supabase. Please review the privacy policies of these
          services to understand how they collect and use your information.
        </p>

        <h3 className="font-semibold text-lg my-2">Data Sharing</h3>
        <p className="my-2">
          We do not sell or rent your personal information to third parties. We
          may employ third-party service providers who perform services on our
          behalf, such as hosting our website. These providers are bound by
          confidentiality agreements.
        </p>
        <h3 className="font-semibold text-lg my-2">Security</h3>
        <p className="my-2">
          We employ industry-standard security measures to protect your
          information and its secure to the best of our knowledge. But remember
          that no method of transmission over the internet, or method of
          electronic storage is 100% secure and reliable, and We cannot
          guarantee its absolute security.
        </p>
        <h3 className="font-semibold text-lg my-2">Changes to This Policy</h3>
        <p className="my-2">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on our website and
          updating the effective date.
        </p>
        <h3 className="font-semibold text-lg my-2">Contact Us</h3>
        <p className="my-2">
          If you have any questions about Privacy Policy, do not hesitate to
          contact at{" "}
          <a
            className="cursor-pointer text-blue-600 underline"
            href="mailto:manoj10kumar.m@gmail.com"
          >
            manoj10kumar.m@gmail.com
          </a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
