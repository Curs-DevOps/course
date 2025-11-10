
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, FileText, Telescope, AlertTriangle } from 'lucide-react';

const logs = [
  { level: 'info', service: 'gateway', msg: 'Request received: GET /orders', traceId: 'a1b2c3d4' },
  { level: 'info', service: 'orders', msg: 'Fetching orders for user 123', traceId: 'a1b2c3d4' },
  { level: 'warn', service: 'inventory', msg: 'Low stock for product XYZ', traceId: 'a1b2c3d4' },
  { level: 'info', service: 'gateway', msg: 'Request received: POST /users', traceId: 'e5f6g7h8' },
  { level: 'error', service: 'payments', msg: 'Payment failed: insufficient funds', traceId: 'i9j0k1l2' },
  { level: 'info', service: 'users', msg: 'User created: 456', traceId: 'e5f6g7h8' },
  { level: 'error', service: 'payments', msg: 'Payment failed: timeout', traceId: 'm3n4o5p6' },
];

const MetricsLogsTracesDiagram = () => {
  const [highlightErrors, setHighlightErrors] = useState(false);

  const getLogLevelColor = (level: string) => {
    if (level === 'error') return 'text-red-400';
    if (level === 'warn') return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-lg font-semibold mb-4">The Three Pillars of Observability</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metrics */}
        <div className="p-2 rounded-lg bg-gray-800">
          <h4 className="font-semibold flex items-center gap-2"><BarChart /> Metrics</h4>
          <div className="h-40 w-full flex items-end gap-1 p-2">
            {[20, 25, 22, 30, 28, 85, 40, 35].map((val, i) => (
              <motion.div
                key={i}
                className={`w-full rounded-t-sm ${val > 80 ? 'bg-red-500 cursor-pointer' : 'bg-green-500'}`}
                style={{ height: `${val / 100 * 100}%` }}
                whileHover={{ backgroundColor: val > 80 ? 'rgb(239 68 68)' : 'rgb(34 197 94 / 0.8)'}}
                onClick={() => { if (val > 80) setHighlightErrors(!highlightErrors); }}
              />
            ))}
            <div className="absolute top-12 left-10 -rotate-12 text-red-400">
              <AlertTriangle />
              <span className="text-xs">Click the spike!</span>
            </div>
          </div>
          <p className="text-xs text-center">Request Error Rate (%)</p>
        </div>

        {/* Logs */}
        <div className="p-2 rounded-lg bg-gray-800">
          <h4 className="font-semibold flex items-center gap-2"><FileText /> Logs</h4>
          <div className="h-48 overflow-y-auto p-2 font-mono text-xs space-y-1">
            {logs.map((log, i) => (
              <motion.div
                key={i}
                className={`p-1 rounded ${highlightErrors && log.level === 'error' ? 'bg-red-900' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: i * 0.1 } }}
              >
                <span className={getLogLevelColor(log.level)}>[{log.level}]</span>
                <span className="text-blue-400"> [{log.service}]</span>
                <span> {log.msg} </span>
                <span className="text-purple-400">(traceId={log.traceId})</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Traces */}
      <div className="mt-4 p-2 rounded-lg bg-gray-800">
        <h4 className="font-semibold flex items-center gap-2"><Telescope /> Traces</h4>
        <p className="text-sm mt-2">
          A trace follows a single request as it moves through all the services in your system. By using the <span className="text-purple-400 font-mono">traceId</span> found in the logs, you can pull up the entire journey of that request.
        </p>
        <p className="text-sm mt-1">This allows you to pinpoint exactly where a failure occurred or what part of the system is causing a slowdown. This is what we visualized in the "Distributed Tracing" lesson!</p>
      </div>
    </div>
  );
};

export default MetricsLogsTracesDiagram;
