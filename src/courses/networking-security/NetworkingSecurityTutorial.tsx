import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, ArrowLeft, Network } from 'lucide-react';
import { CourseComponentProps } from '../../types';
import { networkingSecurityCourseSlides } from './networkingSecurityCourseData';

const NetworkingSecurityTutorial: React.FC<CourseComponentProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<{ [key: string]: boolean }>({});
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

  const currentSlideData = networkingSecurityCourseSlides[currentSlide];

  const toggleStep = (slideIndex: number, stepIndex: number) => {
    const key = `${slideIndex}-${stepIndex}`;
    setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleComplete = (slideIndex: number, stepIndex: number) => {
    const key = `${slideIndex}-${stepIndex}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Network className="w-10 h-10 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Interactive Networking & Security Tutorial</h1>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${((currentSlide + 1) / networkingSecurityCourseSlides.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {currentSlide + 1} of {networkingSecurityCourseSlides.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            {currentSlideData.icon}
            <h2 className="text-2xl font-bold text-gray-800">{currentSlideData.title}</h2>
          </div>

          {currentSlideData.mode === 'lecture' && currentSlideData.content}
          {currentSlideData.mode === 'simulation' && currentSlideData.simulation}

          {(currentSlideData.mode === 'interactive') && (
            <div className="space-y-4">
              {currentSlideData.steps?.map((step, idx) => {
                const key = `${currentSlide}-${idx}`;
                const isExpanded = expandedSteps[key];
                const isCompleted = completedSteps[key];

                return (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleStep(currentSlide, idx)}
                      className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-left">{step.title}</span>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </button>

                    {isExpanded && (
                      <div className="p-4 space-y-3">
                        {step.instructions && <p className="text-gray-700">{step.instructions}</p>}

                        {step.command && (
                           <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                              <pre>{step.command}</pre>
                           </div>
                        )}

                        {step.component && <div className="my-4">{step.component}</div>}

                        {step.expected && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm"><strong>Expected result:</strong> {step.expected}</p>
                          </div>
                        )}

                        <button
                          onClick={() => toggleComplete(currentSlide, idx)}
                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                            isCompleted
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            All Courses
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(networkingSecurityCourseSlides.length - 1, currentSlide + 1))}
              disabled={currentSlide === networkingSecurityCourseSlides.length - 1}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingSecurityTutorial;
