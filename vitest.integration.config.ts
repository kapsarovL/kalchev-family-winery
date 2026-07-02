import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// Crosses a real boundary (DB, API, service-to-service) — slower and fewer
// than unit tests, so kept in a separate config and naming convention
// (*.integration.test.ts) to exclude them from the watch-mode loop.
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    include: ["app/**/*.integration.{test,spec}.ts", "components/**/*.integration.{test,spec}.ts", "lib/**/*.integration.{test,spec}.ts"],
    setupFiles: ["./vitest.integration.setup.ts"],

    // tests share one DB container — run sequentially unless your fixture
    // strategy isolates per-test via transactions
    fileParallelism: false,

    testTimeout: 15000,
    hookTimeout: 30000, // container cold-start headroom

    bail: process.env.CI ? 1 : 0,
  },
});
