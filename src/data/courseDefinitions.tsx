import { CourseDefinition } from '../types';
import GitTutorial from '../courses/git/GitTutorial';
import { GitBranch } from 'lucide-react';


export const allCourses: CourseDefinition[] = [
  {
    id: 'git',
    title: 'Interactive Git Tutorial',
    description: 'Master Git from commits to advanced workflows with a built-in simulator.',
    icon: <GitBranch className="w-10 h-10 text-indigo-600" />,
    component: GitTutorial, // Render this component
  },
];
