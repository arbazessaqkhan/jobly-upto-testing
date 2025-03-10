Jobly Take-Home Assessment
==========================

Welcome to the **Jobly** take-home assessment! Jobly is a simple job management application that allows users to create, update, and delete job postings. Your task is to fix the existing bugs in the code and ensure the application runs smoothly.

**Prerequisites**
-----------------

Before starting, ensure you have the following installed and properly configured:

1.  **Git** -- Make sure Git is installed and accessible from your terminal or command prompt by running:

    ```
    git --version

    ```

2.  **Node.js and npm** -- Ensure Node.js and npm are installed by running:

    ```
    node --version
    npm --version

    ```

3.  **pnpm (Optional but Recommended)** -- We recommend using `pnpm` instead of `npm` as it is faster. If you choose to use `pnpm`, install it globally by running:

    ```
    npm install -g pnpm

    ```

**Setup Instructions**
----------------------

1.  **Clone the Repository**:

    -   Click on the **"Open in VSCode"** button (Note: This might take some time, be patient).

    -   If the button does not work, manually copy the Git repository URL and run the following command in your terminal:

        ```
        git clone <repository-url>

        ```

    -   Navigate into the project directory:

        ```
        cd <cloned-repo-name>

        ```

2.  **Install Dependencies**:

    -   Run one of the following commands to install the required dependencies:

        ```
        npm install
        # or
        pnpm install

        ```

    -   After installation, ensure you see a `node_modules` folder in the project directory.

3.  **Set Up the Database**:

    -   Run database migrations to set up the table structure:

        ```
        npm run migrate:latest
        # or
        pnpm run migrate:latest

        ```

    -   Seed the database with sample data:

        ```
        npm run seed:run
        # or
        pnpm run seed:run

        ```

4.  **Run the Application**:

    -   Start the development server using:

        ```
        npm run dev
        # or
        pnpm run dev

        ```

    -   Open the application in your browser at:

        -   Default: [](http://localhost:3000/)<http://localhost:3000>
        -   If you are using a different port, adjust the URL accordingly.

* * * * *

**Your Task**
-------------

Your main task is to **fix the bugs** in the application.

### **Steps to Follow:**

1.  Run the application and navigate to the **Jobs** section by clicking "Jobs" in the menu.

2.  By default, no jobs should appear, and you will see an error message: `"Failed to fetch jobs"`. This is your starting point.

3.  Try creating a new job posting by clicking **"Create Job"**. This will likely fail---your task is to debug and fix these issues.

4.  To track bugs and verify fixes, run the test suite using:

    ```
    npm run test
    # or
    pnpm run test

    ```

    -   On the first run, you should see:

        ```
        12 failed, 1 passed, 13 total

        ```

5.  Continue debugging and fixing errors. After each fix, re-run:

    -   The application:

        ```
        npm run dev
        # or
        pnpm run dev

        ```

    -   The tests:

        ```
        npm run test
        # or
        pnpm run test

        ```

    -   Keep track of the number of failing tests as you progress.

### **Test Cases Overview**

The table below provides an overview of the key test cases and what they validate:

| Test Name | Brief Description | Status |
| --- | --- | --- |
| renders modal with default values | Validate that the modal component renders with all default form fields present. | ✅ |
| should create a job successfully | Verify job creation endpoint returns expected success response and payload. | ❌ |
| should update a job successfully | Ensure job update endpoint returns proper confirmation and payload structure. | ❌ |
| should delete a job successfully | Check that job deletion is handled correctly, including confirmation handling. | ❌ |
| should return a list of jobs | Confirm that the jobs list endpoint returns the correct array of job items. | ❌ |
| calls onSubmit with correct form data when creating a job | Ensure that form submission calls onSubmit with accurately parsed form data. | ❌ |
| shows edit modal title when editJob is set | Verify that the modal title changes to reflect edit mode when a job is provided. | ❌ |
| resets and clears form fields after submit | Check that form fields are reset to their initial state after submission. | ❌ |
| displays validation errors for required fields and ensures error text is red | Confirm validation errors display appropriately and colour of error text which is shown on invalid fields is red | ❌ |
| renders rows with correct data | Validate that the jobs table correctly displays job details in each row. | ❌ |
| calls onEdit when Edit button is clicked | Ensure that clicking the Edit button triggers the onEdit callback with the right job. | ❌ |
| calls onDelete when Delete button is clicked and user confirms | Verify delete functionality proceeds when confirmation is given. | ❌ |
| does not call onDelete when Delete button is clicked and user cancels | Confirm that the deletion is not triggered when the user cancels the confirmation. | ❌ |

### **Completion Criteria**

✅ All **CRUD** functionalities for jobs should work correctly.

✅ All **test cases** should pass successfully.

✅ Proper **error messages** should be displayed when validation fails.

* * * * *

**Troubleshooting & Common Issues**
-----------------------------------

### **Database Issues**

-   If the database fails to load or you encounter issues, check for the `db.sqlite3` file in the project root.
-   If `db.sqlite3` is missing, create it manually by duplicating and renaming `empty.db.sqlite3` to `db.sqlite3`.

### **Other Common Issues**

-   Ensure you are using the correct Node.js version (check with `node --version`). If needed, use **Node Version Manager (nvm)** to switch versions.

-   If you encounter permission issues, try running the commands with `sudo` (Mac/Linux) or as an administrator (Windows).

-   If the installation fails, try deleting the `node_modules` folder and `package-lock.json`, then reinstall:

    ```
    rm -rf node_modules package-lock.json
    npm install
    # or
    pnpm install

    ```

-   If the application does not start, check for missing environment variables. Ensure a `.env` file is present (if required) and properly configured.

* * * * *

Good luck! 🚀 If you have any questions, reach out for support at jobs@cyberspark.in.