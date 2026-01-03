"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  const message = error?.message || "Something went wrong. We're working to fix it.";

  return (
    <section className="bg-background flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <Image
        width={400}
        height={400}
        priority
        src="/500.svg"
        alt="500 - Unexpected Error"
        className="mx-auto w-full object-contain"
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
            Oops! Something went wrong.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 px-4">
          <Button aria-label="Retry" variant="outline" onClick={() => reset()}>
            Retry
          </Button>
          <Link href="/" passHref aria-label="Go back home">
            <Button>Back Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
