/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef, useEffect, useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { GitState, TerminalEntry } from './types';

interface GitSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const GitSimulator: React.FC<GitSimulatorProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- All Git simulator state and logic lives here ---
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  const [gitState, setGitState] = useState<GitState>({
    currentBranch: 'main',
    branches: ['main'],
    commits: {
      main: [{ hash: 'a1b2c3d', message: 'Initial commit', author: 'System' }]
    },
    stagedFiles: [],
    modifiedFiles: [],
    stash: [],
    remotes: { origin: 'https://github.com/user/repo.git' },
    config: { userName: '', userEmail: '' }
  });

  // --- All Git Simulator Logic (moved from original file) ---
  const generateHash = () => Math.random().toString(36).substring(2, 9);

  const addToHistory = (command: string, output: string, isError = false) => {
    setTerminalHistory(prev => [...prev, { command, output, isError, timestamp: Date.now() }]);
  };

  const executeGitCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0];
    const subcommand = parts[1];
    const args = parts.slice(2);

    if (command !== 'git') {
      addToHistory(cmd, `Command not found: ${command}. This is a Git simulator - only git commands are supported.`, true);
      return;
    }

    switch (subcommand) {
      case 'config':
        handleGitConfig(args);
        break;
      case 'init':
        addToHistory(cmd, 'Initialized empty Git repository in /workspace/.git/');
        break;
      case 'status':
        handleGitStatus();
        break;
      case 'branch':
        handleGitBranch(args);
        break;
      case 'checkout':
        handleGitCheckout(args);
        break;
      case 'add':
        handleGitAdd(args);
        break;
      case 'commit':
        handleGitCommit(args);
        break;
      case 'log':
        handleGitLog(args);
        break;
      case 'merge':
        handleGitMerge(args);
        break;
      case 'pull':
        handleGitPull(args);
        break;
      case 'push':
        handleGitPush(args);
        break;
      case 'clone':
        handleGitClone(args);
        break;
      case 'stash':
        handleGitStash(args);
        break;
      case 'rebase':
        handleGitRebase(args);
        break;
      case 'cherry-pick':
        handleGitCherryPick(args);
        break;
      case '--version':
        addToHistory(cmd, 'git version 2.43.0');
        break;
      default:
        addToHistory(cmd, `git: '${subcommand}' is not a git command. Try: status, branch, checkout, add, commit, log, merge, pull, push, stash, rebase, cherry-pick`, true);
    }
  };

  const handleGitConfig = (args: Array<string>) => {
    if (args.length === 0) {
      const configOutput = Object.entries(gitState.config)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
      addToHistory(`git config ${args.join(' ')}`, configOutput || 'No configuration set');
      return;
    }

    if (args[0] === '--list') {
      const configOutput = `user.name=${gitState.config.userName || '(not set)'}\nuser.email=${gitState.config.userEmail || '(not set)'}`;
      addToHistory(`git config --list`, configOutput);
      return;
    }

    if (args[0] === '--global' && args[1] === 'user.name') {
      const name = args.slice(2).join(' ').replace(/"/g, '');
      setGitState(prev => ({ ...prev, config: { ...prev.config, userName: name } }));
      addToHistory(`git config --global user.name "${name}"`, '');
    } else if (args[0] === '--global' && args[1] === 'user.email') {
      const email = args[2].replace(/"/g, '');
      setGitState(prev => ({ ...prev, config: { ...prev.config, userEmail: email } }));
      addToHistory(`git config --global user.email "${email}"`, '');
    }
  };

  const handleGitStatus = () => {
    let output = `On branch ${gitState.currentBranch}\n`;

    if (gitState.stagedFiles.length === 0 && gitState.modifiedFiles.length === 0) {
      output += 'nothing to commit, working tree clean';
    } else {
      if (gitState.stagedFiles.length > 0) {
        output += '\nChanges to be committed:\n';
        gitState.stagedFiles.forEach(file => {
          output += `  modified:   ${file}\n`;
        });
      }
      if (gitState.modifiedFiles.length > 0) {
        output += '\nChanges not staged for commit:\n';
        gitState.modifiedFiles.forEach(file => {
          output += `  modified:   ${file}\n`;
        });
      }
    }

    addToHistory('git status', output);
  };

  const handleGitBranch = (args: Array<string>) => {
    if (args.length === 0) {
      const output = gitState.branches.map(b =>
        b === gitState.currentBranch ? `* ${b}` : `  ${b}`
      ).join('\n');
      addToHistory('git branch', output);
    } else if (args[0] === '-d' && args[1]) {
      const branchName = args[1];
      if (branchName === gitState.currentBranch) {
        addToHistory(`git branch -d ${branchName}`, `error: Cannot delete branch '${branchName}' checked out`, true);
      } else if (gitState.branches.includes(branchName)) {
        setGitState(prev => ({
          ...prev,
          branches: prev.branches.filter(b => b !== branchName)
        }));
        addToHistory(`git branch -d ${branchName}`, `Deleted branch ${branchName}`);
      } else {
        addToHistory(`git branch -d ${branchName}`, `error: branch '${branchName}' not found`, true);
      }
    }
  };

  const handleGitCheckout = (args: Array<string>) => {
    if (args[0] === '-b' && args[1]) {
      const newBranch = args[1];
      if (gitState.branches.includes(newBranch)) {
        addToHistory(`git checkout -b ${newBranch}`, `fatal: A branch named '${newBranch}' already exists.`, true);
      } else {
        setGitState(prev => ({
          ...prev,
          currentBranch: newBranch,
          branches: [...prev.branches, newBranch],
          commits: {
            ...prev.commits,
            [newBranch]: [...(prev.commits[prev.currentBranch] || [])]
          }
        }));
        addToHistory(`git checkout -b ${newBranch}`, `Switched to a new branch '${newBranch}'`);
      }
    } else if (args[0]) {
      const branch = args[0];
      if (gitState.branches.includes(branch)) {
        setGitState(prev => ({ ...prev, currentBranch: branch }));
        addToHistory(`git checkout ${branch}`, `Switched to branch '${branch}'`);
      } else {
        addToHistory(`git checkout ${branch}`, `error: pathspec '${branch}' did not match any file(s) known to git`, true);
      }
    }
  };

  const handleGitAdd = (args: Array<string>) => {
    if (args[0] === '.') {
      setGitState(prev => ({
        ...prev,
        stagedFiles: [...prev.modifiedFiles],
        modifiedFiles: []
      }));
      addToHistory('git add .', '');
    } else if (args[0]) {
      const file = args[0];
      if (gitState.modifiedFiles.includes(file)) {
        setGitState(prev => ({
          ...prev,
          stagedFiles: [...prev.stagedFiles, file],
          modifiedFiles: prev.modifiedFiles.filter(f => f !== file)
        }));
        addToHistory(`git add ${file}`, '');
      } else {
        // Allow adding new files
        setGitState(prev => ({
          ...prev,
          stagedFiles: [...prev.stagedFiles, file]
        }));
        addToHistory(`git add ${file}`, '');
      }
    }
  };

  const handleGitCommit = (args: Array<string>) => {
    const messageIndex = args.indexOf('-m');
    if (messageIndex === -1) {
      addToHistory('git commit', 'error: Please use -m to specify a commit message', true);
      return;
    }

    const message = args.slice(messageIndex + 1).join(' ').replace(/"/g, '');

    if (gitState.stagedFiles.length === 0) {
      addToHistory(`git commit -m "${message}"`, 'nothing to commit, working tree clean');
      return;
    }

    const newCommit = {
      hash: generateHash(),
      message,
      author: gitState.config.userName || 'Unknown',
      files: [...gitState.stagedFiles]
    };

    setGitState(prev => ({
      ...prev,
      commits: {
        ...prev.commits,
        [prev.currentBranch]: [...(prev.commits[prev.currentBranch] || []), newCommit]
      },
      stagedFiles: []
    }));

    addToHistory(`git commit -m "${message}"`, `[${gitState.currentBranch} ${newCommit.hash}] ${message}\n ${gitState.stagedFiles.length} file(s) changed`);
  };

  const handleGitLog = (args: Array<string>) => {
    const commits = gitState.commits[gitState.currentBranch] || [];

    if (args.includes('--oneline')) {
      const limit = args.includes('-5') ? 5 : commits.length;
      const output = commits.slice(-limit).reverse().map(c =>
        `${c.hash} ${c.message}`
      ).join('\n');
      addToHistory(`git log --oneline ${args.includes('-5') ? '-5' : ''}`, output);
    } else if (args.includes('--graph')) {
      const output = commits.slice(-5).reverse().map((c, _) =>
        `* ${c.hash} ${c.message}`
      ).join('\n');
      addToHistory('git log --oneline --graph --all', output);
    } else {
      const output = commits.slice(-3).reverse().map(c =>
        `commit ${c.hash}\nAuthor: ${c.author}\n\n    ${c.message}\n`
      ).join('\n');
      addToHistory('git log', output);
    }
  };

  const handleGitMerge = (args: Array<string>) => {
    if (!args[0]) {
      addToHistory('git merge', 'error: branch name required', true);
      return;
    }

    const branchToMerge = args[0];
    if (!gitState.branches.includes(branchToMerge)) {
      addToHistory(`git merge ${branchToMerge}`, `error: branch '${branchToMerge}' not found`, true);
      return;
    }

    if (branchToMerge === gitState.currentBranch) {
      addToHistory(`git merge ${branchToMerge}`, 'Already up to date.', false);
      return;
    }

    // Simulate merge
    const branchCommits = gitState.commits[branchToMerge] || [];
    const currentCommits = gitState.commits[gitState.currentBranch] || [];

    setGitState(prev => ({
      ...prev,
      commits: {
        ...prev.commits,
        [prev.currentBranch]: [...currentCommits, ...branchCommits.slice(currentCommits.length)]
      }
    }));

    addToHistory(`git merge ${branchToMerge}`, `Merge made by the 'recursive' strategy.\n ${branchCommits.length - currentCommits.length} commit(s) merged`);
  };

  const handleGitPull = (args: Array<string>) => {
    const remote = args[0] || 'origin';
    const branch = args[1] || gitState.currentBranch;

    addToHistory(`git pull ${remote} ${branch}`, `Already up to date.\nFrom ${gitState.remotes[remote] || 'unknown'}\n * branch            ${branch} -> FETCH_HEAD`);
  };

  const handleGitPush = (args: Array<string>) => {
    const remote = args[0] || 'origin';
    const branch = args[1] || gitState.currentBranch;

    addToHistory(`git push ${remote} ${branch}`, `To ${gitState.remotes[remote] || 'unknown'}\n   ${generateHash()}..${generateHash()}  ${branch} -> ${branch}`);
  };

  const handleGitClone = (args: Array<string>) => {
    if (!args[0]) {
      addToHistory('git clone', 'error: repository URL required', true);
      return;
    }

    const url = args[0];
    const repoName = url.split('/').pop()?.replace('.git', '');
    addToHistory(`git clone ${url}`, `Cloning into '${repoName}'...\nremote: Counting objects: 100, done.\nremote: Compressing objects: 100% (80/80), done.\nReceiving objects: 100% (100/100), done.`);
  };

  const handleGitStash = (args: Array<string>) => {
    if (args[0] === 'save' || args[0] === 'push') {
      const message = args.slice(1).join(' ').replace(/"/g, '') || 'WIP';
      if (gitState.modifiedFiles.length === 0 && gitState.stagedFiles.length === 0) {
        addToHistory(`git stash ${args[0]} "${message}"`, 'No local changes to save');
        return;
      }

      setGitState(prev => ({
        ...prev,
        stash: [...prev.stash, { message, files: [...prev.modifiedFiles, ...prev.stagedFiles] }],
        modifiedFiles: [],
        stagedFiles: []
      }));
      addToHistory(`git stash save "${message}"`, `Saved working directory and index state On ${gitState.currentBranch}: ${message}`);
    } else if (args[0] === 'list') {
      const output = gitState.stash.map((s, i) => `stash@{${i}}: On ${gitState.currentBranch}: ${s.message}`).join('\n') || 'No stash entries';
      addToHistory('git stash list', output);
    } else if (args[0] === 'apply' || args[0] === 'pop') {
      if (gitState.stash.length === 0) {
        addToHistory(`git stash ${args[0]}`, 'No stash entries found.', true);
        return;
      }

      const lastStash = gitState.stash[gitState.stash.length - 1];
      setGitState(prev => ({
        ...prev,
        modifiedFiles: [...prev.modifiedFiles, ...lastStash.files],
        stash: args[0] === 'pop' ? prev.stash.slice(0, -1) : prev.stash
      }));
      addToHistory(`git stash ${args[0]}`, `On branch ${gitState.currentBranch}\nChanges not staged for commit:\n  ${lastStash.files.join('\n  ')}`);
    } else {
      addToHistory(`git stash`, 'Saved working directory and index state WIP on ' + gitState.currentBranch);
    }
  };

  const handleGitRebase = (args: Array<string>) => {
    if (!args[0]) {
      addToHistory('git rebase', 'error: branch name required', true);
      return;
    }

    const targetBranch = args[0];
    if (!gitState.branches.includes(targetBranch)) {
      addToHistory(`git rebase ${targetBranch}`, `error: branch '${targetBranch}' not found`, true);
      return;
    }

    addToHistory(`git rebase ${targetBranch}`, `Successfully rebased and updated refs/heads/${gitState.currentBranch}.`);
  };

  const handleGitCherryPick = (args: Array<string>) => {
    if (!args[0]) {
      addToHistory('git cherry-pick', 'error: commit hash required', true);
      return;
    }

    const hash = args[0];
    const newCommit = {
      hash: generateHash(),
      message: `Cherry-picked commit ${hash}`,
      author: gitState.config.userName || 'Unknown'
    };

    setGitState(prev => ({
      ...prev,
      commits: {
        ...prev.commits,
        [prev.currentBranch]: [...(prev.commits[prev.currentBranch] || []), newCommit]
      }
    }));

    addToHistory(`git cherry-pick ${hash}`, `[${gitState.currentBranch} ${newCommit.hash}] Cherry-picked commit ${hash}`);
  };

  const clearTerminal = () => {
    setTerminalHistory([]);
  };

  const addMockFile = () => {
    const fileName = `file${Math.floor(Math.random() * 100)}.txt`;
    setGitState(prev => ({
      ...prev,
      modifiedFiles: [...prev.modifiedFiles, fileName]
    }));
    addToHistory(`# System: Created mock file`, `Created ${fileName} (use 'git status' to see it)`);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;
    executeGitCommand(currentCommand);
    setCurrentCommand('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Simulator Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Git Simulator</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addMockFile}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
            >
              + Add Mock File
            </button>
            <button
              onClick={clearTerminal}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Terminal Display */}
        <div className="flex-1 bg-gray-900 text-green-400 font-mono text-sm p-4 overflow-y-auto">
          {terminalHistory.map((entry, idx) => (
            <div key={idx} className="mb-3">
              <div className="text-blue-400">
                <span className="text-yellow-400">user@simulator</span>
                <span className="text-white">:</span>
                <span className="text-cyan-400">~/workspace</span>
                <span className="text-white">$ </span>
                {entry.command}
              </div>
              {entry.output && (
                <div className={`whitespace-pre-wrap ${entry.isError ? 'text-red-400' : 'text-green-400'} mt-1`}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-900 p-4">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-yellow-400">user@simulator</span>
            <span className="text-white">:</span>
            <span className="text-cyan-400">~/workspace</span>
            <span className="text-white">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 bg-transparent text-green-400 outline-none border-none"
              placeholder="Type a git command..."
              autoFocus
            />
          </div>
        </form>

        {/* Quick Commands */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600 mb-2">Quick commands:</div>
          <div className="flex flex-wrap gap-2">
            {[
              'git status',
              'git branch',
              'git log --oneline -5',
              'git config --list'
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setCurrentCommand(cmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100 transition-colors font-mono"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitSimulator;
