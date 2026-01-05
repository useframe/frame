"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { CrownIcon } from "lucide-react";
import { Duration, formatDuration, intervalToDuration } from "date-fns";

import { Button } from "@/components/ui/button";

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
    try {
      const now = new Date();
      const end = new Date(now.getTime() + msBeforeNext);
      const duration = intervalToDuration({ start: now, end });
      const format: (keyof Duration)[] = ["months", "days", "hours", "minutes"];
      const formattedDuration = formatDuration(duration, { format });
      return formattedDuration;
    } catch (error) {
      console.error("Error formatting duration", error);
      return "soon";
    }
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
