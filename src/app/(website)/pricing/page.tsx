"use client";

import { dark } from "@clerk/themes";
import Image from "next/image";
import { PricingTable } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";

const Pricing = () => {
  const { theme } = useCurrentTheme();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-8 pt-[16vh] 2xl:py-48">
        <div className="space-y-2">
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Frame AI"
              width={50}
              height={50}
              className="hidden md:block"
            />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Start for free. Upgrade to get the capacity that exactly matches
            your teams&apos; needs.
          </p>
        </div>
        <PricingTable
          appearance={{
            theme: theme === "dark" ? dark : undefined,
            elements: {
              pricingTableCard: "border! shadow-lg! rounded-2xl!",
            },
          }}
        />
      </section>
    </div>
  );
};

export default Pricing;
