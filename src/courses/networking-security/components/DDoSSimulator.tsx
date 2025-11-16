import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Shield, ServerCrash } from 'lucide-react';

const DDoSSimulator: React.FC = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [serverHealth, setServerHealth] = useState(100);
  const [isFirewallEnabled, setIsFirewallEnabled] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isAttacking && !isFirewallEnabled) {
      interval = setInterval(() => {
        setServerHealth(h => Math.max(0, h - 5));
      }, 100);
    } else if (serverHealth < 100) {
      interval = setInterval(() => {
        setServerHealth(h => Math.min(100, h + 2));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isAttacking, isFirewallEnabled, serverHealth]);

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-2xl font-semibold mb-4 text-center flex items-center justify-center"><ServerCrash className="mr-2" /> DDoS Simulator</h3>
      <div className="relative h-72 flex items-center justify-center">
        {/* Server */}
        <div className="z-10 flex flex-col items-center">
          <Server size={64} className={serverHealth > 50 ? 'text-blue-400' : 'text-yellow-500'} />
          <div className="w-32 h-4 bg-gray-700 rounded mt-2">
            <motion.div
              className="h-full rounded"
              style={{ background: serverHealth > 50 ? '#4ade80' : '#facc15' }}
              animate={{ width: `${serverHealth}%` }}
            />
          </div>
          <span className="text-sm mt-1">{serverHealth.toFixed(0)}% Health</span>
        </div>

        {/* Firewall */}
        <motion.div
            className="absolute z-20"
            animate={{ opacity: isFirewallEnabled ? 1 : 0, scale: isFirewallEnabled ? 1 : 0.5 }}
        >
            <Shield size={128} className="text-green-500" />
        </motion.div>

        {/* Attack Animation */}
        {isAttacking && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: `${Math.random() * 100}%`, y: -20, opacity: 0 }}
                animate={{
                  y: '50%',
                  x: isFirewallEnabled ? `${Math.random() * 100}%` : '50%',
                  opacity: isFirewallEnabled ? [0, 0.5, 0] : [0, 1],
                }}
                transition={{
                  duration: Math.random() * 1 + 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              >
                <Zap className="w-3 h-3 text-red-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setIsAttacking(!isAttacking)}
          className={`px-4 py-2 rounded-lg ${isAttacking ? 'bg-red-700' : 'bg-red-500'}`}
        >
          {isAttacking ? 'Stop Attack' : 'Start DDoS Attack'}
        </button>
        <button
          onClick={() => setIsFirewallEnabled(!isFirewallEnabled)}
          className={`px-4 py-2 rounded-lg ${isFirewallEnabled ? 'bg-green-700' : 'bg-green-500'}`}
        >
          {isFirewallEnabled ? 'Disable Mitigation' : 'Enable Mitigation'}
        </button>
      </div>
    </div>
  );
};

export default DDoSSimulator;
