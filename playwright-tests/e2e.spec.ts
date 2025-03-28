// tests/e2e.spec.ts
import { test, expect } from '@playwright/test'
import {Job} from "@/app/jobs.schema";

test('Home page loads and ToggleButton works', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')
    // await page.pause();
    const menuLinkElement = page.getByRole('link', { name: /Jobly/i })
    await expect(menuLinkElement).toBeVisible();

    const jobsLink = page.getByRole('link', { name: /Jobs/i })
    await expect(jobsLink).toBeVisible();
    await jobsLink.click();

    const createButton =  page.getByRole('button', { name: /Create/i })
    await expect(createButton).toBeVisible();
    await createButton.click();

    const jobsModal = page.getByTestId("modal-form-jobs");
    await expect(jobsModal).toBeVisible();

    const titleInput = page.getByTestId('title')
    await expect(titleInput).toBeVisible();
    await titleInput.fill("Cyber Spark")

    const descriptionInput = page.getByTestId('description')
    await expect(descriptionInput).toBeVisible();
    await descriptionInput.fill("Cyber Spark")


    const salaryInput = page.getByTestId('salary')
    await expect(salaryInput).toBeVisible();
    await salaryInput.fill("2000")


    const activeCheckbox = page.getByTestId('is_active')
    await expect(activeCheckbox).toBeVisible();
    await activeCheckbox.check();

    const locationInput = page.getByTestId('location')
    await expect(locationInput).toBeVisible();
    await locationInput.selectOption({label: "Hybrid"})

    const submitButton = page.getByTestId("jobs-submit");
    await submitButton.click();



    //
    //
    await page.pause();


})
