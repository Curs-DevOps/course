import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Server, Shield, User } from 'lucide-react';

const PacketSpoofing: React.FC = () => {
  const [spoofedIp, setSpoofedIp] = useState('192.168.1.100'); // A trusted IP
  const [realIp, _] = useState('172.16.0.5'); // An untrusted IP
  const [isFirewallStrict, setIsFirewallStrict] = useState(false);
  const [packetStatus, setPacketStatus] = useState<'idle' | 'sent' | 'allowed' | 'dropped'>('idle');

  const sendPacket = () => {
    setPacketStatus('sent');
    setTimeout(() => {
      if (isFirewallStrict) {
        setPacketStatus('dropped');
      } else {
        setPacketStatus('allowed');
      }
    }, 1500);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-900 text-white">
      <h3 className="text-2xl font-semibold mb-4 text-center">Packet Spoofing Simulator</h3>
      <div className="grid grid-cols-3 gap-4 items-center h-48">
        {/* Attacker */}
        <div className="flex flex-col items-center">
          <User size={48} className="text-red-500" />
          <span className="mt-2">Attacker</span>
          <span className="text-xs text-gray-400">{realIp}</span>
        </div>

        {/* Packet */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={packetStatus === 'sent' ? { x: 150 } : { x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Package size={48} className="text-yellow-500" />
          </motion.div>
          <div className="text-center text-xs mt-2">
            <p>Source IP: {spoofedIp}</p>
            <p>(Spoofed)</p>
          </div>
        </div>

        {/* Server with Firewall */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Server size={48} className="text-blue-400" />
            <Shield
              size={24}
              className={`absolute -top-2 -right-2 ${isFirewallStrict ? 'text-green-500' : 'text-gray-500'}`}
            />
          </div>
          <span className="mt-2">Server</span>
          <span className="text-xs text-gray-400">10.0.0.5</span>
        </div>
      </div>

      <div className="text-center my-4">
        {packetStatus === 'allowed' && <p className="text-green-500">Packet Allowed! Firewall bypassed.</p>}
        {packetStatus === 'dropped' && <p className="text-red-500">Packet Dropped! Strict firewall blocked it.</p>}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <div>
          <label className="block text-sm">Spoofed Source IP:</label>
          <input
            type="text"
            value={spoofedIp}
            onChange={e => setSpoofedIp(e.target.value)}
            className="p-1 bg-gray-800 border border-gray-600 rounded"
          />
        </div>
        <button onClick={sendPacket} disabled={packetStatus === 'sent'} className="px-4 py-2 bg-red-600 rounded-lg disabled:opacity-50">
          Send Spoofed Packet
        </button>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isFirewallStrict}
            onChange={() => setIsFirewallStrict(!isFirewallStrict)}
            id="strict-fw"
            className="mr-2"
          />
          <label htmlFor="strict-fw">Enable Strict Firewall (Egress Filtering)</label>
        </div>
      </div>
    </div>
  );
};

export default PacketSpoofing;
