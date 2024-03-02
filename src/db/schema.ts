import { timestamp, text, mysqlTable, int, varchar, index } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int("id").autoincrement().primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;