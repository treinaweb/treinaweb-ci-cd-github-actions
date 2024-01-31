import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/**/*.spec.ts'],
    coverage: {
      exclude: [
        'build',
        'src/env/**',
        'src/app.ts',
        'src/server.ts',
        'src/**/routes.ts',
        'src/config',
        'src/core/repositories/prisma',
        'src/core/repositories/*.ts',
        'src/core/domain'
      ]
    }
  }
});
