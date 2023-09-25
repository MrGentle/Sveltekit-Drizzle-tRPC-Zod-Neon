import { Config } from 'drizzle-kit';
import 'dotenv-flow/config';

export default {
	schema: ['./src/schema/task.ts'],
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DRIZZLE_DATABASE_URL!
	}
} satisfies Config;
