"use client";

import { useMemo } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface UsageProps {
  points: number;
  msBeforeNext: number;
}

export function Usage({ points, msBeforeNext }: Readonly<UsageProps>) {
  const { has } = useAuth();
  const hasProPlan = has?.({ plan: "pro" });

  const creditsRemaining = useMemo(() => {
    const plan = hasProPlan ? "pro" : "free";
    const credits = `${points} ${plan} credits remaining`;
    return credits;
  }, [points, hasProPlan]);

  const resetsIn = useMemo(() => {
    return formatDuration(
      intervalToDuration({
        start: new Date(),
        end: new Date(new Date().getTime() + msBeforeNext),
      }),
      { format: ["months", "days", "hours"] }
    );
  }, [msBeforeNext]);

  return (
    <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{creditsRemaining}</p>
          <p className="text-sm">Resets in {resetsIn}</p>
        </div>
        {!hasProPlan && (
          <Button asChild size="sm" variant="outline" className="ml-auto">
            <Link href="/pricing">
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
