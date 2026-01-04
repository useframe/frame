import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

import prisma from "@/lib/prisma";
import { getUsageStatus } from "@/lib/usage";
import { inngest } from "@/lib/inngest/client";

export const usageRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    try {
      const result = await getUsageStatus();
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get usage status",
        cause: error,
      });
    }
  }),
});
