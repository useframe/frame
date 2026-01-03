import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <Image
        width={400}
        height={400}
        priority
        src="/404.svg"
        alt="404 - Page Not Found"
        className="mx-auto w-full object-cover"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">Page Not Found</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            It looks like the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link href="/" passHref>
          <Button>Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
