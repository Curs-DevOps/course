import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Zap, User, UserCheck } from 'lucide-react';

type Mode = 'attacker' | 'defender';

const AttackDefenseSimulator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('defender');
  const [isDDoS, setIsDDoS] = useState(false);
  const [isFirewallUp, setIsFirewallUp] = useState(true);
  const [serverHealth, setServerHealth] = useState(100);

  useEffect(() => {
    let interval: number;
    if (isDDoS && !isFirewallUp) {
      interval = setInterval(() => {
        setServerHealth(h => Math.max(0, h - 10));
      }, 200);
    } else if (serverHealth < 100) {
      interval = setInterval(() => {
        setServerHealth(h => Math.min(100, h + 5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isDDoS, isFirewallUp, serverHealth]);

  const launchDDoS = () => {
    if (mode === 'attacker') {
      setIsDDoS(true);
      setTimeout(() => setIsDDoS(false), 5000); // Attack lasts 5 seconds
    }
  };

  const toggleFirewall = () => {
    if (mode === 'defender') {
      setIsFirewallUp(!isFirewallUp);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setMode('defender')}
          className={`px-4 py-2 rounded-lg flex items-center ${mode === 'defender' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          <UserCheck className="mr-2" /> Defender
        </button>
        <button
          onClick={() => setMode('attacker')}
          className={`px-4 py-2 rounded-lg flex items-center ${mode === 'attacker' ? 'bg-red-600' : 'bg-gray-700'}`}
        >
          <User className="mr-2" /> Attacker
        </button>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        {/* Network visualization */}
        <div className="absolute flex items-center space-x-32">
          <div className="flex flex-col items-center">
            <User size={48} className={mode === 'attacker' ? 'text-red-500' : 'text-gray-400'} />
            <span className="mt-2">Attacker</span>
          </div>
          <Shield size={64} className={isFirewallUp ? 'text-green-500' : 'text-gray-600'} />
          <div className="flex flex-col items-center">
            <Server size={48} className={serverHealth > 50 ? 'text-blue-400' : 'text-yellow-500'} />
            <span className="mt-2">Server</span>
            <div className="w-24 h-4 bg-gray-700 rounded mt-2">
              <motion.div
                className="h-full rounded"
                style={{
                  background: serverHealth > 50 ? '#4ade80' : '#facc15',
                }}
                animate={{ width: `${serverHealth}%` }}
              />
            </div>
            <span className="text-xs">{serverHealth.toFixed(0)}% Health</span>
          </div>
        </div>

        {/* DDoS Attack Animation */}
        {isDDoS && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: '10%',
                  y: Math.random() * 256,
                  opacity: 0,
                }}
                animate={{
                  x: isFirewallUp ? '40%' : '80%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 1 + 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                <Zap className="w-4 h-4 text-red-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Controls</h3>
        {mode === 'attacker' ? (
          <button onClick={launchDDoS} disabled={isDDoS} className="px-4 py-2 bg-red-600 rounded-lg disabled:opacity-50">
            {isDDoS ? 'DDoS in Progress...' : 'Launch DDoS Attack'}
          </button>
        ) : (
          <button onClick={toggleFirewall} className={`px-4 py-2 rounded-lg ${isFirewallUp ? 'bg-green-600' : 'bg-yellow-600'}`}>
            {isFirewallUp ? 'Disable Firewall' : 'Enable Firewall'}
          </button>
        )}
        <p className="mt-4 text-sm text-gray-400">
          {mode === 'attacker'
            ? 'As the attacker, your goal is to take down the server. Launch a DDoS attack!'
            : 'As the defender, your goal is to protect the server. Use the firewall to block attacks.'}
        </p>
      </div>
    </div>
  );
};

export default AttackDefenseSimulator;
