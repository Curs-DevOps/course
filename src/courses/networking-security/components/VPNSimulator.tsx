import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Globe, Server, Lock, Unlock, Wifi, WifiOff } from 'lucide-react';

const VPNSimulator: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-2xl font-semibold mb-4 text-center">VPN Connection Simulator</h3>
      <div className="relative h-64 flex justify-around items-center">
        {/* User */}
        <div className="flex flex-col items-center">
          <User size={48} />
          <span className="mt-2">Your Device</span>
        </div>

        {/* Internet */}
        <div className="flex flex-col items-center">
          <Globe size={64} className="text-gray-500" />
          <span className="mt-2">Public Internet</span>
        </div>

        {/* Corporate Network */}
        <div className="flex flex-col items-center">
          <Server size={48} />
          <span className="mt-2">Corporate Network</span>
        </div>

        {/* VPN Tunnel */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 bg-blue-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isConnected ? 1 : 0 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 1 }}
        />

        {/* Packet Animation */}
        {isConnected && (
          <motion.div
            className="absolute top-1/2"
            style={{ left: '15%' }}
            animate={{ left: '85%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Lock className="text-green-400" />
          </motion.div>
        )}
        {!isConnected && (
            <motion.div
                className="absolute top-1/2"
                style={{ left: '15%' }}
                animate={{ left: '85%', opacity: [1, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
                <Unlock className="text-red-400" />
            </motion.div>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`px-6 py-3 rounded-full text-lg font-semibold flex items-center mx-auto ${
            isConnected ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {isConnected ? <WifiOff className="mr-2" /> : <Wifi className="mr-2" />}
          {isConnected ? 'Disconnect VPN' : 'Connect VPN'}
        </button>
        <p className="mt-4 text-gray-400">
          {isConnected
            ? 'Your traffic is encrypted and securely tunneled to the corporate network.'
            : 'Your traffic is exposed on the public internet.'}
        </p>
      </div>
    </div>
  );
};

export default VPNSimulator;