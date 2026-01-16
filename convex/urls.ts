import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listUrls = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("urls").order("desc").collect();
  },
});

export const addUrl = mutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("urls", {
      url: args.url,
    });
    return id;
  },
});

export const deleteUrl = mutation({
  args: { id: v.id("urls") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
