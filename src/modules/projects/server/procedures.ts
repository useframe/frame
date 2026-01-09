import { z } from "zod";
import { generateSlug } from "random-word-slugs";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

import prisma from "@/lib/prisma";
import { consumeCredits } from "@/lib/usage";
import { inngest } from "@/lib/inngest/client";

export const projectsRouter = createTRPCRouter({
  getProjectById: protectedProcedure
    .input(
      z.object({ id: z.string().min(1, { message: "Project ID is required" }) })
    )
    .query(async ({ input, ctx }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await prisma.project.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
          select: {
            content: true,
          },
        },
      },
    });
    return projects;
  }),
  delete: protectedProcedure
    .input(
      z.object({ id: z.string().min(1, { message: "Project ID is required" }) })
    )
    .mutation(async ({ input, ctx }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      await prisma.project.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
  create: protectedProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, { message: "Value is required" })
          .max(10000, { message: "Value is too long" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await consumeCredits();
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message ?? "Something went wrong!",
          });
        }
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "You have reached the maximum number of requests. Please upgrade to a paid plan or wait for the next reset.",
        });
      }

      const createdProject = await prisma.project.create({
        data: {
          userId: ctx.auth.userId,
          name: generateSlug(2, {
            format: "kebab",
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});
