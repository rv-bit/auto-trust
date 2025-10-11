import { type Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'mysql',

    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },

    verbose: true,
    strict: true,
} as Config);
