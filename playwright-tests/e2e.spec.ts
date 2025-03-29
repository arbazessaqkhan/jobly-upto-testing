// tests/e2e.spec.ts
import {expect, test} from '@playwright/test'
import {Job, jobCollection} from "@/app/jobs.schema";
import {Seeder} from "@lib/crud/seeder";

test('Home page loads and ToggleButton works', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // await page.pause();
    const seeder = new Seeder<Job>(jobCollection);
    const jobToWrite = seeder.generateItem();

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
    await titleInput.fill(jobToWrite.title)

    const descriptionInput = page.getByTestId('description')
    await expect(descriptionInput).toBeVisible();
    await descriptionInput.fill(jobToWrite.description)


    const salaryInput = page.getByTestId('salary')
    await expect(salaryInput).toBeVisible();
    await salaryInput.fill(jobToWrite.salary.toString())


    const activeCheckbox = page.getByTestId('is_active')
    await expect(activeCheckbox).toBeVisible();
    if (jobToWrite.is_active){
    await activeCheckbox.check();
    }
    const locationInput = page.getByTestId('location')
    await expect(locationInput).toBeVisible();
    await locationInput.selectOption({value: jobToWrite.location});

    const submitButton = page.getByTestId("jobs-submit");
    await submitButton.click();


    // await page.pause();


})
