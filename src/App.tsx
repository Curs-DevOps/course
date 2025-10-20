import React from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { allCourses } from './data/courseDefinitions';
import CourseSelector from './components/CourseSelector';

/**
 * Wrapper component for the Home/CourseSelector page.
 * This component handles the navigation logic when a course is selected.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // This handler now navigates to the new URL
  const handleSelectCourse = (id: string) => {
    navigate(`/course/${id}`);
  };

  return <CourseSelector courses={allCourses} onSelectCourse={handleSelectCourse} />;
};

/**
 * Wrapper component for an individual course page.
 * It reads the course ID from the URL, finds the correct component,
 * and passes it the `onBack` prop.
 */
const CoursePageWrapper: React.FC = () => {
  // Get the `courseId` from the URL (e.g., "git" from "/course/git")
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Find the course definition based on the URL parameter
  const course = allCourses.find(c => c.id === courseId);
  const CourseComponent = course?.component;

  // This handler now navigates back to the root URL
  const handleBack = () => {
    navigate('/');
  };

  // If the courseId is invalid, redirect the user to the home page
  if (!CourseComponent) {
    return <Navigate to="/" replace />;
  }

  // Render the correct course component
  return <CourseComponent onBack={handleBack} />;
};

/**
 * The main App component now only contains the route definitions.
 */
const App: React.FC = () => {
  return (
    <Routes>
      {/* Route 1: The home page (course selection) */}
      <Route path="/" element={<HomePage />} />

      {/* Route 2: The dynamic course page */}
      <Route path="/course/:courseId" element={<CoursePageWrapper />} />

      {/* Route 3: A catch-all redirect for any unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;