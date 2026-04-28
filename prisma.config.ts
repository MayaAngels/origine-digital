import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        url: env('DATABASE_URL'),
    },
    // Define o motor clássico (sem Accelerate) para usar com Next.js
    engine: 'classic',
});
