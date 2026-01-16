import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  urls: defineTable({
    url: v.string(),
    summary: v.optional(v.string()),
  }),
});
