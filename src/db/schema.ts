import { relations } from 'drizzle-orm';
import { timestamp, text, mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  username: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
}));

export const bio = mysqlTable('bio', {
  text: text('title'), 
  userId: int('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const bioRelations = relations(bio, ({ one }) => ({
  user: one(users, {
    fields: [bio.userId],
    references: [users.id],
  }),
}));

export const posts = mysqlTable('posts', {
  id: int("id").autoincrement().primaryKey(),
  title: text('title'),
  text: text('title').notNull(), 
  userId: int('user_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export const comments = mysqlTable('comments', {
  id: int('id').primaryKey(),
  text: text('text').notNull(),
  userId: int('user_id'),
  postId: int('post_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  likes: many(likes),
}));

export const likes = mysqlTable('likes', {
  id: int('id').primaryKey(),
  userId: int('user_id'),
  postId: int('post_id'),
  commentId: int('comment_id'),
});

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  comment: one(comments, {
    fields: [likes.commentId],
    references: [comments.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;