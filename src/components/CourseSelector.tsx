import React from 'react';
import { CourseDefinition } from '../types';

interface CourseSelectorProps {
  courses: CourseDefinition[];
  onSelectCourse: (id: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, onSelectCourse }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Interactive Learning Hub
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-left flex items-start gap-6"
            >
              <div className="shrink-0">
                {course.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;
