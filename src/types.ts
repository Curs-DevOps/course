import React from 'react';

/**
 * Defines the props that EVERY course component must accept.
 * This ensures our App.tsx can render any course and provide
 * a way to go back to the menu.
 */
export interface CourseComponentProps {
  onBack: () => void;
}

/**
 * Defines the metadata for a course, used by the CourseSelector.
 */
export interface CourseDefinition {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  /**
   * The actual React component to render for this course.
   * It must accept CourseComponentProps.
   */
  component: React.ComponentType<CourseComponentProps>;
}

