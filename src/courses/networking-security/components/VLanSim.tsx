import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Server } from 'lucide-react';

interface Vlan {
  id: number;
  name: string;
  color: string;
}

interface Port {
  id: number;
  vlanId: number | null;
}

const initialVlans: Vlan[] = [
  { id: 1, name: 'Sales', color: '#3b82f6' },
  { id: 2, name: 'Engineering', color: '#10b981' },
];

const initialPorts: Port[] = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, vlanId: null }));

const VLanSim: React.FC = () => {
  const [vlans, _] = useState<Vlan[]>(initialVlans);
  const [ports, setPorts] = useState<Port[]>(initialPorts);
  const [selectedVlan, setSelectedVlan] = useState<number | null>(1);

  const assignVlan = (portId: number) => {
    if (selectedVlan) {
      setPorts(ports.map(p => p.id === portId ? { ...p, vlanId: selectedVlan } : p));
    }
  };

  const unassignVlan = (portId: number) => {
    setPorts(ports.map(p => p.id === portId ? { ...p, vlanId: null } : p));
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 grid grid-cols-3 gap-4">
      {/* VLANs */}
      <div className="col-span-1">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><GitBranch className="mr-2" /> VLANs</h3>
        <div className="space-y-2">
          {vlans.map(vlan => (
            <div
              key={vlan.id}
              onClick={() => setSelectedVlan(vlan.id)}
              className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${selectedVlan === vlan.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: vlan.color, color: 'white' }}
            >
              <span>{vlan.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Switch Ports */}
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Switch Ports</h3>
        <div className="grid grid-cols-4 gap-4">
          {ports.map(port => {
            const vlan = vlans.find(v => v.id === port.vlanId);
            return (
              <motion.div
                key={port.id}
                onClick={() => assignVlan(port.id)}
                onDoubleClick={() => unassignVlan(port.id)}
                className="h-24 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                style={{ borderColor: vlan?.color || '#ccc', borderWidth: vlan ? '4px' : '2px' }}
                whileHover={{ scale: 1.1 }}
              >
                <Server className="w-8 h-8" />
                <span className="text-sm mt-1">Port {port.id}</span>
                {vlan && <span className="text-xs font-bold" style={{ color: vlan.color }}>{vlan.name}</span>}
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">Click to assign selected VLAN, double-click to remove.</p>
      </div>
    </div>
  );
};

export default VLanSim;
