import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Database, Server, Shield, Zap } from 'lucide-react';

const generateLog = () => {
  const levels = ['INFO', 'WARN', 'ERROR'];
  const services = ['frontend', 'backend', 'database', 'auth'];
  const messages = [
    'User logged in',
    'Failed to connect to database',
    'Request timed out',
    'Payment processed successfully',
    'Invalid credentials',
  ];
  return {
    level: levels[Math.floor(Math.random() * levels.length)],
    service: services[Math.floor(Math.random() * services.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date().toLocaleTimeString(),
  };
};

const generateMetric = () => {
  return {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    latency: Math.random() * 200 + 50,
  };
};

const ObservabilityDashboard: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState(generateMetric());

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogs(prev => [generateLog(), ...prev.slice(0, 9)]);
    }, 2000);
    const metricInterval = setInterval(() => {
      setMetrics(generateMetric());
    }, 1500);

    return () => {
      clearInterval(logInterval);
      clearInterval(metricInterval);
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white grid grid-cols-3 grid-rows-2 gap-4 h-[600px]">
      {/* Metrics */}
      <div className="col-span-2 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center"><BarChart2 className="mr-2" /> Real-time Metrics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="text-gray-400">CPU Usage</h4>
            <p className="text-2xl font-bold">{metrics.cpu.toFixed(1)}%</p>
          </div>
          <div>
            <h4 className="text-gray-400">Memory Usage</h4>
            <p className="text-2xl font-bold">{metrics.memory.toFixed(1)}%</p>
          </div>
          <div>
            <h4 className="text-gray-400">P95 Latency</h4>
            <p className="text-2xl font-bold">{metrics.latency.toFixed(0)}ms</p>
          </div>
        </div>
        {/* Simple chart */}
        <div className="h-48 mt-4">
            <svg width="100%" height="100%" viewBox="0 0 400 150">
                <motion.path
                    d={`M0 75 Q 100 ${150 - metrics.cpu * 1.5} 200 75 T 400 75`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.path
                    d={`M0 75 Q 100 ${150 - metrics.memory * 1.5} 200 75 T 400 75`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                />
                 <motion.path
                    d={`M0 ${150 - metrics.latency / 2} Q 100 ${150 - metrics.latency / 2} 200 ${150 - metrics.latency / 2} T 400 ${150 - metrics.latency / 2}`}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
            </svg>
        </div>
      </div>

      {/* Logs */}
      <div className="col-span-1 row-span-2 p-4 bg-gray-800 rounded-lg overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2 flex items-center"><Activity className="mr-2" /> Live Logs</h3>
        <div className="space-y-2 text-xs font-mono">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded ${log.level === 'ERROR' ? 'bg-red-900' : log.level === 'WARN' ? 'bg-yellow-900' : 'bg-gray-700'}`}
            >
              <span className="font-bold">{log.timestamp}</span> [{log.service}] {log.message}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Map */}
      <div className="col-span-2 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Service Map</h3>
        <div className="flex justify-around items-center h-full">
            <div className="text-center"><Server className="mx-auto"/><span>Frontend</span></div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowRight />
            </motion.div>
            <div className="text-center"><Shield className="mx-auto"/><span>API Gateway</span></div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
                <ArrowRight />
            </motion.div>
            <div className="text-center"><Database className="mx-auto"/><span>Database</span></div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}>
                <ArrowRight />
            </motion.div>
            <div className="text-center"><Zap className="mx-auto"/><span>Auth Service</span></div>
        </div>
      </div>
    </div>
  );
};

export default ObservabilityDashboard;

// Helper component for arrow
const ArrowRight = () => (
    <svg width="50" height="20" viewBox="0 0 50 20">
        <path d="M0 10 H40 L35 5 M40 10 L35 15" stroke="white" strokeWidth="2" fill="none" />
    </svg>
)