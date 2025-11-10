
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Server, Zap, FileText, Telescope } from 'lucide-react';

const SidecarPatternAnimation = () => {
  const [requests, setRequests] = useState<any[]>([]);

  const handleRequest = () => {
    const reqId = Date.now();
    setRequests(prev => [...prev, { id: reqId }]);
    setTimeout(() => setRequests(prev => prev.filter(r => r.id !== reqId)), 4000);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Box className="w-6 h-6 text-purple-500" /> Sidecar Pattern Simulation</h3>

      <div className="grid grid-cols-3 justify-items-center items-center h-64 relative">
        {/* Client */}
        <div className="flex flex-col items-center">
          <button onClick={handleRequest} className="px-4 py-2 rounded-lg bg-blue-500 text-white">Send Request</button>
        </div>

        {/* Main Pod */}
        <div className="w-64 h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center p-4 relative">
          <span className="absolute -top-6 text-sm font-semibold">Pod</span>
          <div className="flex gap-4">
            {/* App Container */}
            <div className="w-24 h-32 bg-blue-200 rounded-lg flex flex-col items-center justify-center text-center">
              <Server className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-semibold mt-1">App Container</span>
            </div>
            {/* Sidecar Container */}
            <div className="w-24 h-32 bg-purple-200 rounded-lg flex flex-col items-center justify-center text-center">
              <Box className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-semibold mt-1">Sidecar (OTel)</span>
            </div>
          </div>
        </div>

        {/* Observability Backend */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <Telescope className="w-10 h-10 text-green-600" />
          </div>
          <span className="font-semibold">Observability Platform</span>
          <span className="text-xs">(Jaeger / Loki)</span>
        </div>

        {/* Animations */}
        <AnimatePresence>
          {requests.map(req => (
            <React.Fragment key={req.id}>
              {/* 1. Request to App */}
              <motion.div
                className="absolute"
                initial={{ x: -200, y: 0, opacity: 0 }}
                animate={{ x: 0, opacity: [0, 1, 0], transition: { duration: 1 } }}
              >
                <Zap className="text-yellow-400 w-8 h-8" />
              </motion.div>
              {/* 2. Telemetry from App to Sidecar */}
              <motion.div
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: 80, opacity: [0, 1, 0], transition: { delay: 1, duration: 1 } }}
              >
                <FileText className="text-gray-500 w-5 h-5" />
              </motion.div>
              {/* 3. Telemetry from Sidecar to Backend */}
              <motion.div
                className="absolute"
                initial={{ x: 80, y: 0, opacity: 0 }}
                animate={{ x: 280, opacity: [0, 1, 0], transition: { delay: 2, duration: 1.5 } }}
              >
                <Telescope className="text-green-500 w-6 h-6" />
              </motion.div>
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidecarPatternAnimation;
