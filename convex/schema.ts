import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
    groupId: v.optional(v.id('groups')),
  }),
  groups: defineTable({
    name: v.string(),
    activeChallengeId: v.optional(v.id('challenges')),
    ownerUserId: v.id('users'),
    joinCode: v.string(),
  }).index('owner_join_code', ['ownerUserId', 'joinCode']),
  challenges: defineTable({
    title: v.string(),
    description: v.string(),
  }),
  challengeHistory: defineTable({
    groupId: v.id('groups'),
    challengeId: v.id('challenges'),
    startDate: v.number(),
    endDate: v.number(),
  }).index('by_group', ['groupId']),
  posts: defineTable({
    source: v.string(),
    type: v.union(v.literal('image'), v.literal('video')),
    challengeId: v.id('challenges'),
    authorUserId: v.id('users'),
  }),
  ratings: defineTable({
    postId: v.id('posts'),
    userId: v.id('users'),
    rating: v.union(v.literal('like'), v.literal('unclear')),
  }),
});
