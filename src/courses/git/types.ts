export interface TerminalEntry {
  command: string;
  output: string;
  isError: boolean;
  timestamp: number;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  files?: string[];
}

export interface GitState {
  currentBranch: string;
  branches: string[];
  commits: {
    [branch: string]: GitCommit[];
  };
  stagedFiles: string[];
  modifiedFiles: string[];
  stash: { message: string; files: string[] }[];
  remotes: {
    [name: string]: string;
  };
  config: {
    userName: string;
    userEmail: string;
  };
}
