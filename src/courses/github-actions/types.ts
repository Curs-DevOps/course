
export interface GitHubActionsStep {
    title: string;
    instructions: string;
    workflow: string;
    expected: string;
    command?: string;
}

export interface GitHubActionsSlide {
    title: string;
    icon: JSX.Element;
    mode: 'lecture' | 'interactive';
    content?: JSX.Element;
    steps?: GitHubActionsStep[];
}
