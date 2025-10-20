import { GitBranch, User, Users, GitPullRequest, Key } from "lucide-react";

const gitCourseSlides = [
  {
    title: "Introduction to Git",
    icon: <GitBranch className="w-8 h-8" />,
    mode: "lecture",
    content: (
      <div className="space-y-4">
        <p className="text-lg">Git is a distributed version control system that helps you track changes in your code and collaborate with others.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Why Git?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Track every change in your project</li>
            <li>Collaborate without overwriting others' work</li>
            <li>Experiment safely with branches</li>
            <li>Revert to previous versions anytime</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "Setup: Installing Git & Basic Config",
    icon: <User className="w-8 h-8" />,
    mode: "individual",
    steps: [
      {
        title: "Install Git",
        instructions: "Download and install Git from git-scm.com",
        command: "git --version",
        expected: "Should display git version 2.x.x"
      },
      {
        title: "Configure your identity",
        instructions: "Set your name and email for commits",
        command: `git config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"`,
        expected: "No output means success"
      },
      {
        title: "Verify configuration",
        instructions: "Check that your config was saved",
        command: "git config --list",
        expected: "You should see your name and email"
      }
    ]
  },
  {
    title: "Clone: Getting a Repository",
    icon: <User className="w-8 h-8" />,
    mode: "individual",
    steps: [
      {
        title: "Clone a repository",
        instructions: "Copy a remote repository to your local machine",
        command: "git clone https://github.com/username/repo-name.git",
        expected: "Creates a new folder with the repository contents"
      },
      {
        title: "Navigate into the repo",
        instructions: "Move into your newly cloned repository",
        command: "cd repo-name",
        expected: "You're now inside the repository folder"
      },
      {
        title: "Check the status",
        instructions: "See the current state of your repository",
        command: "git status",
        expected: "Should show 'On branch main' with clean working tree"
      }
    ]
  },
  {
    title: "Pull: Getting Latest Changes",
    icon: <User className="w-8 h-8" />,
    mode: "individual",
    steps: [
      {
        title: "Pull from remote",
        instructions: "Download and merge the latest changes from the remote repository",
        command: "git pull origin main",
        expected: "Updates your local branch with remote changes"
      },
      {
        title: "Check what changed",
        instructions: "View the commit history",
        command: "git log --oneline -5",
        expected: "Shows the last 5 commits"
      }
    ]
  },
  {
    title: "Checkout -b: Creating Branches",
    icon: <User className="w-8 h-8" />,
    mode: "individual",
    steps: [
      {
        title: "Create a new branch",
        instructions: "Create and switch to a new branch for your feature",
        command: "git checkout -b feature/my-feature",
        expected: "Switched to a new branch 'feature/my-feature'"
      },
      {
        title: "Make some changes",
        instructions: "Edit a file, then stage and commit it",
        command: `echo "My changes" >> file.txt\ngit add file.txt\ngit commit -m "Add my feature"`,
        expected: "Creates a commit on your new branch"
      },
      {
        title: "View all branches",
        instructions: "See all your local branches",
        command: "git branch",
        expected: "Shows all branches, with * next to current branch"
      }
    ]
  },
  {
    title: "Stash: Saving Work in Progress",
    icon: <User className="w-8 h-8" />,
    mode: "individual",
    steps: [
      {
        title: "Make uncommitted changes",
        instructions: "Edit a file without committing",
        command: "echo \"Work in progress\" >> temp.txt",
        expected: "File is modified but not committed"
      },
      {
        title: "Stash your changes",
        instructions: "Temporarily save your changes without committing",
        command: "git stash save \"WIP: my temporary work\"",
        expected: "Saved working directory is now clean"
      },
      {
        title: "List stashes",
        instructions: "See all your stashed changes",
        command: "git stash list",
        expected: "Shows your stash with the message"
      },
      {
        title: "Apply stash",
        instructions: "Bring back your stashed changes",
        command: "git stash apply",
        expected: "Your changes reappear"
      }
    ]
  },
  {
    title: "Merge: Combining Branches",
    icon: <Users className="w-8 h-8" />,
    mode: "pairs",
    steps: [
      {
        title: "Person A: Create feature branch",
        instructions: "First person creates a branch and makes changes",
        command: `git checkout -b feature-a\necho "Feature A" > feature-a.txt\ngit add feature-a.txt\ngit commit -m "Add feature A"`,
        expected: "Feature A is committed"
      },
      {
        title: "Person B: Create another feature",
        instructions: "Second person creates their own branch",
        command: `git checkout main\ngit checkout -b feature-b\necho "Feature B" > feature-b.txt\ngit add feature-b.txt\ngit commit -m "Add feature B"`,
        expected: "Feature B is committed on separate branch"
      },
      {
        title: "Person A: Merge to main",
        instructions: "Merge your feature into main",
        command: `git checkout main\ngit merge feature-a`,
        expected: "Feature A is now on main branch"
      },
      {
        title: "Person B: Merge to main",
        instructions: "Merge your feature into main",
        command: `git checkout main\ngit pull\ngit merge feature-b`,
        expected: "Feature B is merged successfully (no conflict)"
      }
    ]
  },
  {
    title: "Merge Conflicts: Resolving Disagreements",
    icon: <Users className="w-8 h-8" />,
    mode: "pairs",
    steps: [
      {
        title: "Both: Edit the same file",
        instructions: "Both people edit the same line in the same file on different branches",
        command: `# Person A:\ngit checkout -b conflict-a\necho "Person A's version" > shared.txt\ngit add shared.txt\ngit commit -m "A's changes"\n\n# Person B:\ngit checkout main\ngit checkout -b conflict-b\necho "Person B's version" > shared.txt\ngit add shared.txt\ngit commit -m "B's changes"`,
        expected: "Two conflicting versions exist"
      },
      {
        title: "Person A: Merge first",
        instructions: "Merge Person A's branch (no conflict yet)",
        command: `git checkout main\ngit merge conflict-a`,
        expected: "Fast-forward merge, no issues"
      },
      {
        title: "Person B: Merge and see conflict",
        instructions: "Try to merge Person B's branch",
        command: `git checkout main\ngit merge conflict-b`,
        expected: "CONFLICT! Git tells you there's a merge conflict"
      },
      {
        title: "Person B: Resolve the conflict",
        instructions: "Open shared.txt, choose which changes to keep, remove conflict markers",
        command: `# Edit shared.txt to resolve conflicts\n# Remove <<<<<<, ======, >>>>>>>\ngit add shared.txt\ngit commit -m "Resolve merge conflict"`,
        expected: "Conflict resolved and committed"
      }
    ]
  },
  {
    title: "Rebase: Advanced History Rewriting",
    icon: <Users className="w-8 h-8" />,
    mode: "pairs",
    steps: [
      {
        title: "Person A: Create feature branch",
        instructions: "Make commits on a feature branch",
        command: `git checkout -b feature-rebase\necho "Commit 1" > file1.txt\ngit add file1.txt\ngit commit -m "First commit"\necho "Commit 2" > file2.txt\ngit add file2.txt\ngit commit -m "Second commit"`,
        expected: "Two commits on feature-rebase"
      },
      {
        title: "Person B: Update main branch",
        instructions: "Add commits to main while A is working",
        command: `git checkout main\necho "Main update" > main.txt\ngit add main.txt\ngit commit -m "Update main"`,
        expected: "Main has diverged from feature-rebase"
      },
      {
        title: "Person A: Rebase onto main",
        instructions: "Reapply your commits on top of latest main",
        command: `git checkout feature-rebase\ngit rebase main`,
        expected: "Your commits are now on top of main's commits (linear history)"
      },
      {
        title: "Compare: Rebase vs Merge",
        instructions: "Check the difference in history",
        command: "git log --oneline --graph --all",
        expected: "Rebase creates linear history, merge creates diamond shape"
      }
    ]
  },
  {
    title: "Cherry-pick: Selecting Specific Commits",
    icon: <Users className="w-8 h-8" />,
    mode: "pairs",
    steps: [
      {
        title: "Person A: Create multiple commits",
        instructions: "Make several commits on a branch",
        command: `git checkout -b feature-cherry\necho "Fix 1" > fix1.txt\ngit add fix1.txt\ngit commit -m "Critical fix"\necho "Feature" > feature.txt\ngit add feature.txt\ngit commit -m "New feature"\necho "Fix 2" > fix2.txt\ngit add fix2.txt\ngit commit -m "Another fix"`,
        expected: "Three commits with different purposes"
      },
      {
        title: "Person A: Get commit hash",
        instructions: "Find the hash of the 'Critical fix' commit",
        command: "git log --oneline",
        expected: "Copy the hash of 'Critical fix' commit"
      },
      {
        title: "Person B: Cherry-pick the fix",
        instructions: "Apply only the critical fix to main",
        command: `git checkout main\ngit cherry-pick <commit-hash>`,
        expected: "Only the 'Critical fix' is applied to main"
      },
      {
        title: "Verify cherry-pick",
        instructions: "Check that only one commit was applied",
        command: "git log --oneline -3",
        expected: "The fix commit appears, but not the feature"
      }
    ]
  },
  {
    title: "Pull Request (PR): Collaboration Workflow",
    icon: <GitPullRequest className="w-8 h-8" />,
    mode: "pairs",
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">What is a Pull Request?</h3>
          <p>A PR is a request to merge your changes into another branch. It allows for:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Code review before merging</li>
            <li>Discussion about changes</li>
            <li>Automated testing</li>
            <li>Quality control</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Typical PR Workflow</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a feature branch: <code className="bg-white px-2 py-1 rounded">git checkout -b feature/new-feature</code></li>
            <li>Make your changes and commit them</li>
            <li>Push to remote: <code className="bg-white px-2 py-1 rounded">git push origin feature/new-feature</code></li>
            <li>Open a PR on GitHub/GitLab/Bitbucket</li>
            <li>Team reviews your code</li>
            <li>Make requested changes</li>
            <li>PR gets approved and merged</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Exercise: Create a PR (Pairs)</h3>
          <p className="mb-2"><strong>Person A:</strong></p>
          <ol className="list-decimal list-inside space-y-1 mb-3">
            <li>Create a branch and make changes</li>
            <li>Push: <code className="bg-white px-2 py-1 rounded">git push origin your-branch</code></li>
            <li>Go to GitHub and click "New Pull Request"</li>
            <li>Add description of your changes</li>
          </ol>
          <p className="mb-2"><strong>Person B:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Review the PR on GitHub</li>
            <li>Leave comments or suggestions</li>
            <li>Approve the PR if it looks good</li>
            <li>Person A can then merge the PR</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    title: "Why Use SSH with GitHub?",
    icon: <Key className="w-8 h-8 text-green-700" />,
    mode: "lecture",
    content: (
      <div className="space-y-4">
        <p className="text-lg">SSH (Secure Shell) is a protocol used to securely access remote computers. When used with Git, it provides a secure and convenient way to interact with your remote repositories (like on GitHub) without typing your credentials every time.</p>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">HTTPS vs. SSH</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>HTTPS:</strong> Easy to start (e.g., `git clone https://...`). Requires a Personal Access Token (PAT) for every push/pull.</li>
            <li><strong>SSH:</strong> Requires a one-time setup (e.g., `git clone git@github.com:...`). Uses a public/private key pair for authentication.</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Why Use SSH? 🤔</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Convenience:</strong> After setup, you don't need to enter your username or token for `git push`, `git pull`, etc.</li>
            <li><strong>Security:</strong> Authentication happens via your private key, which *never* leaves your computer. This is generally more secure than token-based authentication.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "Setup: SSH Keys for GitHub",
    icon: <Key className="w-8 h-8 text-green-700" />,
    mode: "individual",
    steps: [
      {
        title: "Generate a new SSH key",
        instructions: "Open your terminal (Git Bash on Windows, Terminal on Mac/Linux). Use the 'ed25519' algorithm, which is modern and secure. You can set a custom name e.g. ~/.ssh/github_<my_account_username>",
        command: `ssh-keygen -t ed25519 -C "your.email@example.com"`,
        expected: "Press Enter to accept the default file location (~/.ssh/id_ed25519). Set a strong passphrase when prompted (highly recommended!)."
      },
      {
        title: "Start the SSH agent",
        instructions: "The agent manages your keys and passphrase so you don't have to re-type it. (On Git Bash for Windows, this may run automatically.)",
        command: `# On Linux/Mac:\neval "$(ssh-agent -s)"`,
        expected: "Should output something like 'Agent pid 12345'"
      },
      {
        title: "Add your key to the agent",
        instructions: "Tell the agent about your new key. Use your custom name if any",
        command: `ssh-add ~/.ssh/id_ed25519`,
        expected: "It will ask for your passphrase (if you set one), then output 'Identity added: ...'"
      },
      {
        title: "Copy your *public* key",
        instructions: "You need to give the public key (the .pub file) to GitHub. Use one of these commands to copy its contents to your clipboard.",
        command: `# On Mac:\npbcopy < ~/.ssh/id_ed25519.pub\n\n# On Linux (xclip required):\nxclip -selection clipboard < ~/.ssh/id_ed25519.pub\n\n# On Windows (Git Bash):\ncat ~/.ssh/id_ed25519.pub | clip\n\n# Fallback (all systems):\ncat ~/.ssh/id_ed25519.pub\n# (Then manually select and copy the output)`,
        expected: "Your key (e.g., 'ssh-ed25519 AAAA...') is on your clipboard."
      },
      {
        title: "Add key to GitHub",
        instructions: "1. Go to GitHub.com\n2. Click your profile picture > Settings\n3. Go to 'SSH and GPG keys'\n4. Click 'New SSH key'\n5. Give it a title (e.g., 'My Work Laptop')\n6. Paste your key from the clipboard into the 'Key' field.\n7. Click 'Add SSH key'.",
        command: "(This step is done on the GitHub website, not the terminal)",
        expected: "Your new key is listed in your GitHub account."
      },
      {
        title: "Test your connection",
        instructions: "Verify that your machine can now authenticate with GitHub using your key.",
        command: `ssh -T git@github.com`,
        expected: "After a warning about authenticity (type 'yes'), you should see: 'Hi <your-username>! You've successfully authenticated...'"
      }
    ]
  },
];

export {
  gitCourseSlides
}