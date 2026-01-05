import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { getUsageStatus } from "@/lib/usage";

export const usageRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async () => {
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
