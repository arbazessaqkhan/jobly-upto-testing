export default function Home() {
  return (
      <div>
          <div className="container my-5">
              <header className="mb-4">
                  <h1 className="display-4">Jobly Take-Home Assessment</h1>
                  <p className="lead">Welcome to the <strong>Jobly</strong> take-home assessment! Jobly is a simple job
                      management application that allows users to create, update, and delete job postings. Your task is
                      to fix the existing bugs in the code and ensure the application runs smoothly.</p>
              </header>

              <section className="mb-5">
                  <h2 className="mb-3">Prerequisites</h2>
                  <p>Before starting, ensure you have the following installed and properly configured:</p>
                  <ol>
                      <li>
                          <strong>Git</strong> – Make sure Git is installed and accessible from your terminal or command
                          prompt by running:
                          <pre className="bg-light p-3"><code>git --version</code></pre>
                      </li>
                      <li>
                          <strong>Node.js and npm</strong> – Ensure Node.js and npm are installed by running:
                          <pre className="bg-light p-3"><code>node --version</code></pre>
                            <pre className="bg-light p-3"><code>npm --version</code></pre>
                      </li>
                      <li>
                          <strong>pnpm (Optional but Recommended)</strong> – We recommend
                          using <code>pnpm</code> instead of <code>npm</code> as it is faster. If you choose to
                          use <code>pnpm</code>, install it globally by running:
                          <pre className="bg-light p-3"><code>npm install -g pnpm</code></pre>
                      </li>
                  </ol>
              </section>

              <section className="mb-5">
                  <h2 className="mb-3">Setup Instructions</h2>
                  <ol>
                      <li>
                          <strong>Clone the Repository</strong>:
                          <ul>
                              <li>Click on the <strong>&#34;Open in VSCode&#34;</strong> button (Note: This might take some
                                  time, be patient).
                              </li>
                              <li>If the button does not work, manually copy the Git repository URL and run the
                                  following command in your terminal:
                                  <pre className="bg-light p-3"><code>git clone &lt;repository-url&gt;</code></pre>
                              </li>
                              <li>Navigate into the project directory:
                                  <pre className="bg-light p-3"><code>cd  &lt;cloned-repo-name&gt;</code></pre>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <strong>Install Dependencies</strong>:
                          <ul>
                              <li>Run one of the following commands to install the required dependencies:
                                  <pre className="bg-light p-3"><code>npm install
# or
pnpm install</code></pre>
                              </li>
                              <li>After installation, ensure you see a <code>node_modules</code> folder in the project
                                  directory.
                              </li>
                          </ul>
                      </li>
                      <li>
                          <strong>Set Up the Database</strong>:
                          <ul>
                              <li>Run database migrations to set up the table structure:
                                  <pre className="bg-light p-3"><code>npm run migrate:latest
# or
pnpm run migrate:latest</code></pre>
                              </li>
                              <li>Seed the database with sample data:
                                  <pre className="bg-light p-3"><code>npm run seed:run
# or
pnpm run seed:run</code></pre>
                              </li>
                          </ul>
                      </li>
                      <li>
                          <strong>Run the Application</strong>:
                          <ul>
                              <li>Start the development server using:
                                  <pre className="bg-light p-3"><code>npm run dev
# or
pnpm run dev</code></pre>
                              </li>
                              <li>Open the application in your browser at:
                                  <ul>
                                      <li>Default: <a href="http://localhost:3000"
                                                      target="_blank">http://localhost:3000</a></li>
                                      <li>If you are using a different port, adjust the URL accordingly.</li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                  </ol>
              </section>

              <hr/>

              <section className="mb-5">
                  <h2 className="mb-3">Your Task</h2>
                  <p>Your main task is to <strong>fix the bugs</strong> in the application.</p>
                  <h3 className="mt-4">Steps to Follow:</h3>
                  <ol>
                      <li>Run the application and navigate to the <strong>Jobs</strong> section by clicking &#34;Jobs&#34; in
                          the menu.
                      </li>
                      <li>By default, no jobs should appear, and you will see an error message: <code> &#34;Failed to fetch
                          jobs&#34;</code>. This is your starting point.
                      </li>
                      <li>Try creating a new job posting by clicking <strong>&#34;Create Job&#34;</strong>. This will likely
                          fail—your task is to debug and fix these issues.
                      </li>
                      <li>
                          To track bugs and verify fixes, run the test suite using:
                          <pre className="bg-light p-3"><code>npm run test
# or
pnpm run test</code></pre>
                          <ul>
                              <li>On the first run, you should see:
                                  <pre className="bg-light p-3"><code>12 failed, 1 passed, 13 total</code></pre>
                              </li>
                          </ul>
                      </li>
                      <li>
                          Continue debugging and fixing errors. After each fix, re-run:
                          <ul>
                              <li>The application:
                                  <pre className="bg-light p-3"><code>npm run dev
# or
pnpm run dev</code></pre>
                              </li>
                              <li>The tests:
                                  <pre className="bg-light p-3"><code>npm run test
# or
pnpm run test</code></pre>
                              </li>
                              <li>Keep track of the number of failing tests as you progress.</li>
                          </ul>
                      </li>
                  </ol>
                  <h3 className="mt-4">Test Cases Overview</h3>
                  <p>The table below provides an overview of the key test cases and what they validate:</p>
                  <div className="table-responsive">
                      <table className="table table-bordered">
                          <thead className="table-light">
                          <tr>
                              <th>Test Name</th>
                              <th>Brief Description</th>
                              <th>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>renders modal with default values</td>
                              <td>Validate that the modal component renders with all default form fields present.</td>
                              <td>✅</td>
                          </tr>
                          <tr>
                              <td>should create a job successfully</td>
                              <td>Verify job creation endpoint returns expected success response and payload.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>should update a job successfully</td>
                              <td>Ensure job update endpoint returns proper confirmation and payload structure.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>should delete a job successfully</td>
                              <td>Check that job deletion is handled correctly, including confirmation handling.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>should return a list of jobs</td>
                              <td>Confirm that the jobs list endpoint returns the correct array of job items.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>calls onSubmit with correct form data when creating a job</td>
                              <td>Ensure that form submission calls onSubmit with accurately parsed form data.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>shows edit modal title when editJob is set</td>
                              <td>Verify that the modal title changes to reflect edit mode when a job is provided.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>resets and clears form fields after submit</td>
                              <td>Check that form fields are reset to their initial state after submission.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>displays validation errors for required fields and ensures error text is red</td>
                              <td>Confirm validation errors display appropriately and that error text is red on invalid
                                  fields.
                              </td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>renders rows with correct data</td>
                              <td>Validate that the jobs table correctly displays job details in each row.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>calls onEdit when Edit button is clicked</td>
                              <td>Ensure that clicking the Edit button triggers the onEdit callback with the right
                                  job.
                              </td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>calls onDelete when Delete button is clicked and user confirms</td>
                              <td>Verify delete functionality proceeds when confirmation is given.</td>
                              <td>❌</td>
                          </tr>
                          <tr>
                              <td>does not call onDelete when Delete button is clicked and user cancels</td>
                              <td>Confirm that the deletion is not triggered when the user cancels the confirmation.
                              </td>
                              <td>❌</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
                  <p className="mt-3"><strong>Completion Criteria</strong></p>
                  <ul>
                      <li>✅ All <strong>CRUD</strong> functionalities for jobs should work correctly.</li>
                      <li>✅ All <strong>test cases</strong> should pass successfully.</li>
                      <li>✅ Proper <strong>error messages</strong> should be displayed when validation fails.</li>
                  </ul>
              </section>

              <section className="mb-5">
                  <h2 className="mb-3">Troubleshooting &amp; Common Issues</h2>
                  <h3 className="mt-4">Database Issues</h3>
                  <ul>
                      <li>If the database fails to load or you encounter issues, check for
                          the <code>db.sqlite3</code> file in the project root.
                      </li>
                      <li>If <code>db.sqlite3</code> is missing, create it manually by duplicating and
                          renaming <code>empty.db.sqlite3</code> to <code>db.sqlite3</code>.
                      </li>
                  </ul>
                  <h3 className="mt-4">Other Common Issues</h3>
                  <ul>
                      <li>Ensure you are using the correct Node.js version (check with <code>node --version</code>). If
                          needed, use <strong>Node Version Manager (nvm)</strong> to switch versions.
                      </li>
                      <li>If you encounter permission issues, try running the commands
                          with <code>sudo</code> (Mac/Linux) or as an administrator (Windows).
                      </li>
                      <li>If the installation fails, try deleting the <code>node_modules</code> folder
                          and <code>package-lock.json</code>, then reinstall:
                          <pre className="bg-light p-3"><code>rm -rf node_modules package-lock.json
npm install
# or
pnpm install</code></pre>
                      </li>
                      <li>If the application does not start, check for missing environment variables. Ensure
                          a <code>.env</code> file is present (if required) and properly configured.
                      </li>
                  </ul>
              </section>

              <footer className="text-center">
                  <p>Good luck! 🚀 If you have any questions, reach out for support at <b>jobs@cyberspark.in</b>.</p>
              </footer>
          </div>


      </div>
  );
}
