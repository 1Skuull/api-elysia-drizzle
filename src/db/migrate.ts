import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './db';
import { users } from './schema';

await migrate(db, { migrationsFolder: './drizzle' });

await connection.end();

// const result = await db.query.users.findMany({
//     with: {
//       posts: true
//     },
//   });
// console.log(result)