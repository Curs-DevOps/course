
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, HeartPulse, Play, Pause, RefreshCw } from 'lucide-react';

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF-OPEN';

const CircuitBreakerAnimation = () => {
  const [circuitState, setCircuitState] = useState<CircuitState>('CLOSED');
  const [isServiceHealthy, setIsServiceHealthy] = useState(true);
  const [stats, setStats] = useState({ success: 0, failure: 0, shortCircuited: 0 });
  const [requests, setRequests] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const failureThreshold = 3;
  const resetTimeout = 5000; // 5s
  const failureCount = useRef(0);
  const openTime = useRef(0);
  const simulationInterval = useRef<any>(null);

  const addRequest = (status: 'success' | 'failure' | 'short-circuited') => {
    const reqId = Date.now();
    setRequests(prev => [...prev, { id: reqId, status }]);
    setTimeout(() => setRequests(prev => prev.filter(r => r.id !== reqId)), 1000);
  };

  const handleRequest = () => {
    if (circuitState === 'OPEN') {
      if (Date.now() - openTime.current > resetTimeout) {
        setCircuitState('HALF-OPEN');
      } else {
        setStats(s => ({ ...s, shortCircuited: s.shortCircuited + 1 }));
        addRequest('short-circuited');
        return;
      }
    }

    // In CLOSED or HALF-OPEN state, send the request
    if (isServiceHealthy) {
      addRequest('success');
      setStats(s => ({ ...s, success: s.success + 1 }));
      if (circuitState === 'HALF-OPEN') {
        setCircuitState('CLOSED');
        failureCount.current = 0;
      }
    } else {
      addRequest('failure');
      setStats(s => ({ ...s, failure: s.failure + 1 }));
      failureCount.current += 1;
      if (circuitState === 'HALF-OPEN' || failureCount.current >= failureThreshold) {
        setCircuitState('OPEN');
        openTime.current = Date.now();
      }
    }
  };

  useEffect(() => {
    if (isSimulating) {
      simulationInterval.current = setInterval(handleRequest, 1200);
    } else {
      clearInterval(simulationInterval.current);
    }
    return () => clearInterval(simulationInterval.current);
  }, [isSimulating, circuitState, isServiceHealthy]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setCircuitState('CLOSED');
    setStats({ success: 0, failure: 0, shortCircuited: 0 });
    failureCount.current = 0;
  };

  const getStateColor = (state: CircuitState) => {
    if (state === 'CLOSED') return 'text-green-500';
    if (state === 'OPEN') return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><HeartPulse className="w-6 h-6 text-red-500" /> Circuit Breaker Simulation</h3>
      <div className="grid grid-cols-3 items-center justify-items-center mb-8 relative h-24">
        <div><span className="font-semibold">Client</span></div>
        <div className={`p-2 rounded-lg font-mono text-sm font-semibold ${getStateColor(circuitState)}`}>
          {circuitState}
        </div>
        <div>
          <span className="font-semibold">Service</span>
          <button onClick={() => setIsServiceHealthy(s => !s)} className={`ml-2 px-2 py-1 text-xs rounded ${isServiceHealthy ? 'bg-green-200' : 'bg-red-200'}`}>
            {isServiceHealthy ? 'Healthy' : 'Failing'}
          </button>
        </div>
        <AnimatePresence>
          {requests.map(req => (
            <motion.div
              key={req.id}
              className="absolute top-8"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: req.status === 'short-circuited' ? -100 : 200, opacity: [1, 0] }}
              transition={{ duration: 1 }}
            >
              <Zap className={`w-6 h-6 ${req.status === 'success' ? 'text-green-400' : 'text-red-400'}`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center gap-4 mb-4">
        <button onClick={() => setIsSimulating(s => !s)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center gap-2">
          {isSimulating ? <><Pause/> Pause</> : <><Play/> Start</>}
        </button>
        <button onClick={resetSimulation} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4"/> Reset
        </button>
      </div>
      <div className="text-center">
        <p>Success: {stats.success} | Failure: {stats.failure} | Short-circuited: {stats.shortCircuited}</p>
        <p className="text-xs text-gray-500 mt-1">Failure threshold: {failureThreshold}. Resets after {resetTimeout/1000}s in OPEN state.</p>
      </div>
    </div>
  );
};

export default CircuitBreakerAnimation;
