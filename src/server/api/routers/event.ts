import { EventStatus, Event } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // TODO: add a filter to get the events within a date range only!
    return await ctx.prisma.event.findMany();
  }),

  get: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.event.findFirst({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(
      z.object({
        clientName: z.string(),
        status: z.nativeEnum(EventStatus).optional(),
        location: z.string().optional(),
        dateTime: z.date().optional(),
        service: z.string(),
        serviceFee: z.number().optional(),
      })
    )
    .output(
      z.object({
        id: z.string().cuid().nullable(),
        error: z.unknown(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const event = await ctx.prisma.event.create({
          data: input,
          select: { id: true },
        });
        return { ...event, error: null };
      } catch (error) {
        return { id: null, error };
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        clientName: z.string().optional(),
        status: z.nativeEnum(EventStatus).optional(),
        location: z.string().optional(),
        dateTime: z.date().optional(),
        service: z.string().optional(),
        serviceFee: z.number().optional(),
      })
    )
    .output(
      z.object({
        id: z.string().cuid().nullable(),
        error: z.unknown(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const event = ctx.prisma.event.update({
          where: { id: input.id },
          data: { ...input, id: undefined },
          select: { id: true },
        });
        return event;
      } catch (error) {
        return { id: null, error };
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .output(
      z.object({ id: z.string().nullable(), error: z.unknown().nullable() })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const event = await ctx.prisma.event.delete({
          where: { id: input.id },
          select: { id: true },
        });
        return event;
      } catch (error) {
        return { id: null, error };
      }
    }),
});
