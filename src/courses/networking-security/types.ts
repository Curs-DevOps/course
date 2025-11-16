import { ReactNode } from 'react';

export interface NetworkingSecuritySlide {
  title: string;
  icon: ReactNode;
  mode: 'lecture' | 'interactive' | 'simulation';
  content?: ReactNode;
  steps?: InteractiveStep[];
  simulation?: ReactNode;
}

export interface InteractiveStep {
  title: string;
  instructions: any;
  component: ReactNode;
  expected?: string;
  command?: string;
}
