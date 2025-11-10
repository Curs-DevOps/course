
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronRight, GitBranch } from 'lucide-react';
import { CourseComponentProps } from '../../types';
import { microservicesCourseSlides } from './microservicesCourseData';
import ApiGatewaySimulation from './components/ApiGatewaySimulation';
import ServiceDiscoveryAnimation from './components/ServiceDiscoveryAnimation';
import CircuitBreakerAnimation from './components/CircuitBreakerAnimation';
import EventDrivenArchitectureAnimation from './components/EventDrivenArchitectureAnimation';
import SidecarPatternAnimation from './components/SidecarPatternAnimation';
import OutboxPatternAnimation from './components/OutboxPatternAnimation';
import VaultAnimation from './components/VaultAnimation';
import ObservabilityAnimation from './components/ObservabilityAnimation';
import MetricsLogsTracesDiagram from './components/MetricsLogsTracesDiagram';

const MicroservicesTutorial: React.FC<CourseComponentProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<{ [key: string]: boolean }>({});
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});
  const [routes, setRoutes] = useState({
    '/api/users': 'users',
    '/api/products': 'products',
  });
  const [routesString, setRoutesString] = useState(JSON.stringify(routes, null, 2));

  const handleRoutesChange = (text: string) => {
    setRoutesString(text);
    try {
      const parsedRoutes = JSON.parse(text);
      setRoutes(parsedRoutes);
    } catch (e) {
      console.error('Invalid JSON for routes:', e);
    }
  };

  const currentSlideData = microservicesCourseSlides[currentSlide];

  const toggleStep = (slideIndex: number, stepIndex: number) => {
    const key = `${slideIndex}-${stepIndex}`;
    setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleComplete = (slideIndex: number, stepIndex: number) => {
    const key = `${slideIndex}-${stepIndex}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (currentSlide < microservicesCourseSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <GitBranch className="w-10 h-10 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Microservices Architecture and Patterns</h1>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / microservicesCourseSlides.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step {currentSlide + 1} of {microservicesCourseSlides.length}: {currentSlideData.title}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              {currentSlideData.icon}
              <h2 className="text-2xl font-bold text-gray-800">{currentSlideData.title}</h2>
            </div>

            {currentSlideData.content}

            {currentSlideData.steps && (
              <div className="space-y-4">
                {currentSlideData.steps.map((step, idx) => {
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
                          <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-semibold">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-left">{step.title}</span>
                          {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </div>
                        {isExpanded ? <ChevronDown /> : <ChevronRight />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-4">
                              <div className="text-gray-700">{step.instructions}</div>

                              {step.simulation === 'ApiGateway' && <ApiGatewaySimulation routes={routes} />}
                              {step.simulation === 'ServiceDiscovery' && <ServiceDiscoveryAnimation />}
                              {step.simulation === 'CircuitBreaker' && <CircuitBreakerAnimation />}
                              {step.simulation === 'EventDrivenArchitecture' && <EventDrivenArchitectureAnimation />}
                              {step.simulation === 'SidecarPattern' && <SidecarPatternAnimation />}
                              {step.simulation === 'OutboxPattern' && <OutboxPatternAnimation />}
                              {step.simulation === 'Vault' && <VaultAnimation />}
                              {step.simulation === 'Observability' && <ObservabilityAnimation />}
                              {step.simulation === 'MetricsLogsTraces' && <MetricsLogsTracesDiagram />}

                              {step.code && (
                                <textarea
                                  className="w-full h-48 p-4 border rounded-lg bg-gray-900 text-white font-mono text-sm"
                                  value={routesString}
                                  onChange={(e) => handleRoutesChange(e.target.value)}
                                />
                              )}

                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm"><strong>Expected result:</strong> {step.expected}</p>
                              </div>

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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

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
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlide === microservicesCourseSlides.length - 1}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroservicesTutorial;
