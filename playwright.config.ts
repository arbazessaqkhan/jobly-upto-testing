// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './playwright-tests', // directory for your tests
    use: {
        baseURL: 'http://localhost:3000', // your Next.js app should be running locally
        headless: false, // set to false if you want to see the browser
    },
})
