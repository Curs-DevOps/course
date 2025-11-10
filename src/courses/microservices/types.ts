
import { ReactNode } from 'react';

export interface Microservice {
  id: string;
  name: string;
  version: string;
  ip: string;
  status: 'running' | 'stopped' | 'error';
}

export interface ApiGatewayRoute {
  path: string;
  serviceId: string;
}

export interface MicroservicesStep {
  title: string;
  instructions: ReactNode;
  code?: {
    language: string;
    content: string;
  };
  simulation?: string;
  expected: ReactNode;
}

export interface MicroservicesSlide {
  title: string;
  icon: ReactNode;
  mode: 'lecture' | 'interactive';
  content?: ReactNode;
  steps?: MicroservicesStep[];
}
