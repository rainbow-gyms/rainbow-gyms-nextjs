import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  fullyParallel: true,

  reporter: [["html", { outputFolder: "playwright-report" }]],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
