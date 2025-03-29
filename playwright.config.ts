// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './playwright-tests', // directory for your tests
    use: {
        baseURL: 'http://localhost:3000', // your Next.js app should be running locally
        headless: false, // set to false if you want to see the browser,
        launchOptions:{
            slowMo: 1000
        }
    },
    // webServer: {
    //     command: 'npm run dev',   // or yarn dev, pnpm dev, etc.
    //     url: 'http://localhost:3000', // The URL Playwright should wait for
    //     reuseExistingServer: true, // <== This will not start another server if one is running!
    //     timeout: 120 * 1000,       // Optional: timeout for starting the server
    // },
})
