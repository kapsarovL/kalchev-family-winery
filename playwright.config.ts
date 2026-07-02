import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ["html", { open: "never" }],
    ["list"],
    process.env.CI ? ["github"] : ["line"],
  ],

  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 5000,
  },

  // full matrix on main/nightly only - PRs only need chromium for fast feedback
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      grep: process.env.FULL_BROWSER_MATRIX ? undefined : /@smoke/,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      grep: process.env.FULL_BROWSER_MATRIX ? undefined : /@smoke/,
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      grep: /@smoke/,
    },
  ],

  webServer: {
    command: "pnpm build && pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
