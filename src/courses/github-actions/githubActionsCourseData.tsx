
import { GitMerge, Terminal, Lock } from 'lucide-react';
import { GitHubActionsSlide } from './types';

export const githubActionsCourseSlides: GitHubActionsSlide[] = [
  {
    title: 'Introduction to GitHub Actions',
    icon: <GitMerge className="w-8 h-8" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4">
        <p className="text-lg">GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Why GitHub Actions?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Automation:</strong> Automate your software development workflows.</li>
            <li><strong>Integration:</strong> Seamlessly integrated with GitHub.</li>
            <li><strong>Community:</strong> A large marketplace of pre-built actions.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'Basic Workflow - Step by Step',
    icon: <Terminal className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: The Trigger',
        instructions: 'The `on` keyword specifies the trigger for the workflow. We want this workflow to run on every `push` to the repository. You can also specify branches, tags, or paths. For example, `on: [pull_request]` would trigger the workflow on every pull request. Fill in the blank to set the trigger to `push`.',
        workflow: `
name: Java CI

on: [____]
`,
        expected: 'The workflow will now trigger on every push.'
      },
      {
        title: 'Step 2: The Job',
        instructions: 'A workflow is made up of one or more jobs. The `jobs` keyword is used to define the jobs. We will define a single job called `build`. This job will run on an `ubuntu-latest` runner. Fill in the blanks to define the job.',
        workflow: `
name: Java CI

on: [push]

jobs:
  build:
    runs-on: ____
`,
        expected: 'The workflow now has a build job.'
      },
      {
        title: 'Step 3: The Steps',
        instructions: 'A job is made up of a sequence of steps. We will add three steps to our build job: one to check out the code, one to set up Java, and one to build the project with Maven. Fill in the blanks to add the steps.',
        workflow: `
name: Java CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: ____@v2
    - name: Set up JDK 1.8
      uses: actions/setup-java@v1
      with:
        java-version: 1.8
    - name: Build with Maven
      run: mvn -f courses/docker/java-app/pom.xml clean install
`,
        expected: 'The workflow will now build the Java application.'
      },
    ],
  },
  {
    title: 'Environments and Secrets',
    icon: <Lock className="w-8 h-8" />,
    mode: 'lecture',
    content: (
      <div className="space-y-4">
        <p className="text-lg">Secrets are encrypted environment variables that you can use in your workflows. They are a secure way to store sensitive information, like passwords, API keys, and tokens.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Global vs. Environment Secrets</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Global Secrets:</strong> Available to all workflows in a repository.</li>
            <li><strong>Environment Secrets:</strong> Only available to workflows that use a specific environment.</li>
          </ul>
        </div>
        <p className="text-lg">Environments are used to create a boundary around a group of secrets and to control access to them. For example, you could have a `production` environment with secrets for your production database, and a `staging` environment with secrets for your staging database.</p>
      </div>
    ),
  },
  {
    title: 'Creating an Environment',
    icon: <Lock className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: Go to Settings',
        instructions: 'In your GitHub repository, go to Settings > Environments.',
        workflow: ``,
        expected: 'You are on the Environments page.'
      },
      {
        title: 'Step 2: Create a New Environment',
        instructions: 'Click the "New environment" button. Give your environment a name, for example, `production`.',
        workflow: ``,
        expected: 'A new environment is created.'
      },
      {
        title: 'Step 3: Add a Secret',
        instructions: 'In your new environment, click the "Add secret" button. Give your secret a name, for example, `DOCKER_PASSWORD`, and a value.',
        workflow: ``,
        expected: 'The secret is added to the environment.'
      },
    ],
  },
  {
    title: 'Using an Environment in a Workflow',
    icon: <Terminal className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Reference the Environment',
        instructions: 'To use an environment in a workflow, you need to reference it in your job. Fill in the blank to use the `production` environment.',
        workflow: `
name: Docker Push

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    environment: ____

    steps:
    - uses: actions/checkout@v2
    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}
    - name: Build and push Docker image
      uses: docker/build-push-action@v2
      with:
        context: courses/docker/java-app
        push: true
        tags: your-docker-hub-username/simple-java-app:latest
`,
        expected: 'The workflow will now use the production environment.'
      },
    ],
  },
  {
    title: 'Global Secrets',
    icon: <Lock className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Step 1: Go to Settings',
        instructions: 'In your GitHub repository, go to Settings > Secrets and variables > Actions.',
        workflow: ``,
        expected: 'You are on the Secrets page.'
      },
      {
        title: 'Step 2: Create a New Secret',
        instructions: 'Click the "New repository secret" button. Give your secret a name, for example, `DOCKER_USERNAME`, and a value.',
        workflow: ``,
        expected: 'The secret is added to the repository.'
      },
    ],
  },
  {
    title: 'Secrets and Variables',
    icon: <Terminal className="w-8 h-8" />,
    mode: 'interactive',
    steps: [
      {
        title: 'Differentiating Secrets and Variables',
        instructions: 'This workflow demonstrates the difference between environment secrets, global secrets, and workflow variables. The `env` keyword is used to define workflow variables. Fill in the blanks to complete the workflow.',
        workflow: `
name: Secrets and Variables

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    environment: production
    env:
      WORKFLOW_VARIABLE: "This is a workflow variable"

    steps:
    - name: Print Secrets and Variables
      run: |
        echo "Global Secret: \${{ secrets.____ }}"
        echo "Environment Secret: \${{ secrets.____ }}"
        echo "Workflow Variable: \${{ env.____ }}"
`,
        expected: 'The workflow will print the values of the secrets and the variable.'
      },
    ],
  }
];
