import { migrate } from 'drizzle-orm/mysql2/migrator';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from './schema';
import 'dotenv/config';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});

export const db = drizzle(connection, { schema: { users }, mode: "default" });

// const result = await db.select().from(users);
// console.log(result)

await migrate(db, { migrationsFolder: './drizzle' });

console.log("Hello Drizzle")

await connection.end();