import { DRIZZLE_DATABASE_URL } from '$env/static/private';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { migrate } from 'drizzle-orm/postgres-js/migrator';

neonConfig.fetchConnectionCache = true;

const sql = neon(DRIZZLE_DATABASE_URL);
const db = drizzle(sql);
// Transactions are currently unsupported with neon adapter
// await migrate(db, { migrationsFolder: "drizzle" });

export default db;
