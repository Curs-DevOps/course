
export interface DockerStep {
    title: string;
    instructions: string;
    dockerfile: string;
    expected: string;
    command?: string;
}

export interface DockerSlide {
    title: string;
    icon: JSX.Element;
    mode: 'lecture' | 'interactive';
    content?: JSX.Element;
    steps?: DockerStep[];
}
