import { auth } from "@clerk/nextjs/server";
import { RateLimiterPrisma } from "rate-limiter-flexible";

import prisma from "@/lib/prisma";

const GENERATION_COST = 1;
const FREE_USAGE_POINTS = 2;
const PRO_USAGE_POINTS = 100;
const FREE_USAGE_DURATION = 30 * 24 * 60 * 60; // 30 days

export async function getUsageTracker() {
  const { has, userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const hasProPlan = has({ plan: "pro" });
  const limiter = new RateLimiterPrisma({
    tableName: "Usage",
    storeClient: prisma,
    duration: FREE_USAGE_DURATION,
    points: hasProPlan ? PRO_USAGE_POINTS : FREE_USAGE_POINTS,
  });

  return limiter;
}

export async function consumeCredits() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const limiter = await getUsageTracker();
  const result = await limiter.consume(userId, GENERATION_COST);

  if (!result.consumedPoints) {
    throw new Error("Insufficient credits");
  }

  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const limiter = await getUsageTracker();
  const result = await limiter.get(userId);
  return result;
}
