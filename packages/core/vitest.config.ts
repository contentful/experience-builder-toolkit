// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'reports',
    },
    environment: 'happy-dom',
  },
});
