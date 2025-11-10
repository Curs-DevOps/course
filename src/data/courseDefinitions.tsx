
import { CourseDefinition } from '../types';
import GitTutorial from '../courses/git/GitTutorial';
import DockerTutorial from '../courses/docker/DockerTutorial';
import GitHubActionsTutorial from '../courses/github-actions/GitHubActionsTutorial';
import MicroservicesTutorial from '../courses/microservices/MicroservicesTutorial';
import { GitBranch, Sailboat, GitMerge, Cpu } from 'lucide-react';


export const allCourses: CourseDefinition[] = [
  {
    id: 'git',
    title: 'Interactive Git Tutorial',
    description: 'Master Git from commits to advanced workflows with a built-in simulator.',
    icon: <GitBranch className="w-10 h-10 text-indigo-600" />,
    component: GitTutorial, // Render this component
  },
  {
    id: 'docker',
    title: 'Docker and Docker Compose',
    description: 'Learn how to containerize a Java application with Docker and Docker Compose.',
    icon: <Sailboat className="w-10 h-10 text-blue-600" />,
    component: DockerTutorial,
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions and CI/CD Security',
    description: 'Master GitHub Actions and learn how to secure your CI/CD pipeline.',
    icon: <GitMerge className="w-10 h-10 text-purple-600" />,
    component: GitHubActionsTutorial,
  },
  {
    id: 'microservices',
    title: 'Microservices Architecture and Patterns',
    description: 'An interactive journey into microservices, from API gateways to event-driven architecture.',
    icon: <Cpu className="w-10 h-10 text-teal-600" />,
    component: MicroservicesTutorial,
  },
];

