import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, ShieldX, ArrowRight, Plus, Trash2 } from 'lucide-react';

interface Packet {
  id: number;
  sourceIp: string;
  destIp: string;
  port: number;
  protocol: 'TCP' | 'UDP';
}

interface Rule {
  id: number;
  action: 'allow' | 'drop';
  sourceIp: string;
  destIp: string;
  port: string;
  protocol: 'TCP' | 'UDP' | 'ANY';
}

const initialPackets: Packet[] = [
  { id: 1, sourceIp: '192.168.1.10', destIp: '10.0.0.5', port: 443, protocol: 'TCP' },
  { id: 2, sourceIp: '192.168.1.11', destIp: '10.0.0.5', port: 80, protocol: 'TCP' },
  { id: 3, sourceIp: '8.8.8.8', destIp: '10.0.0.5', port: 53, protocol: 'UDP' },
  { id: 4, sourceIp: '192.168.1.12', destIp: '10.0.0.5', port: 22, protocol: 'TCP' },
];

const initialRules: Rule[] = [
  { id: 1, action: 'allow', sourceIp: '*', destIp: '*', port: '443', protocol: 'TCP' },
  { id: 2, action: 'drop', sourceIp: '*', destIp: '*', port: '*', protocol: 'ANY' },
];

const FirewallSimulator: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [packets, _] = useState<Packet[]>(initialPackets);
  const [newRule, setNewRule] = useState<Omit<Rule, 'id'>>({
    action: 'allow',
    sourceIp: '*',
    destIp: '*',
    port: '*',
    protocol: 'ANY',
  });

  const filteredPackets = useMemo(() => {
    return packets.map(packet => {
      for (const rule of rules) {
        const sourceMatch = rule.sourceIp === '*' || rule.sourceIp === packet.sourceIp;
        const destMatch = rule.destIp === '*' || rule.destIp === packet.destIp;
        const portMatch = rule.port === '*' || rule.port === String(packet.port);
        const protocolMatch = rule.protocol === 'ANY' || rule.protocol === packet.protocol;

        if (sourceMatch && destMatch && portMatch && protocolMatch) {
          return { ...packet, status: rule.action };
        }
      }
      return { ...packet, status: 'drop' }; // Default drop
    });
  }, [packets, rules]);

  const addRule = () => {
    setRules([...rules, { ...newRule, id: Date.now() }]);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 grid grid-cols-3 gap-4">
      {/* Packets */}
      <div className="col-span-1">
        <h3 className="text-xl font-semibold mb-2">Incoming Packets</h3>
        <div className="space-y-2">
          {packets.map(p => (
            <div key={p.id} className="p-2 bg-white rounded shadow text-sm">
              {p.sourceIp} {'->'} {p.destIp}:{p.port} ({p.protocol})
            </div>
          ))}
        </div>
      </div>

      {/* Firewall */}
      <div className="col-span-1 flex flex-col items-center">
        <Shield size={64} className="text-blue-500 mb-4" />
        <AnimatePresence>
          {filteredPackets.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center my-2"
            >
              <div className="p-2 bg-white rounded shadow text-sm w-48 text-center">
                {p.sourceIp} {'->'} {p.destIp}:{p.port}
              </div>
              <ArrowRight className="mx-2" />
              {p.status === 'allow' ? (
                <ShieldCheck size={32} className="text-green-500" />
              ) : (
                <ShieldX size={32} className="text-red-500" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Rules */}
      <div className="col-span-1">
        <h3 className="text-xl font-semibold mb-2">Firewall Rules</h3>
        <div className="space-y-2 mb-4">
          {rules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-2 bg-white rounded shadow text-sm">
              <span>
                {rule.action.toUpperCase()} {rule.protocol} from {rule.sourceIp} to {rule.destIp}:{rule.port}
              </span>
              <button onClick={() => removeRule(rule.id)}><Trash2 className="w-4 h-4 text-red-500" /></button>
            </div>
          ))}
        </div>
        <div className="space-y-2 p-2 border rounded-lg">
          <h4 className="font-semibold">New Rule</h4>
          <select value={newRule.action} onChange={e => setNewRule({ ...newRule, action: e.target.value as 'allow' | 'drop' })} className="w-full p-1 border rounded">
            <option value="allow">Allow</option>
            <option value="drop">Drop</option>
          </select>
          <input type="text" value={newRule.sourceIp} onChange={e => setNewRule({ ...newRule, sourceIp: e.target.value })} placeholder="Src IP" className="w-full p-1 border rounded" />
          <input type="text" value={newRule.destIp} onChange={e => setNewRule({ ...newRule, destIp: e.target.value })} placeholder="Dest IP" className="w-full p-1 border rounded" />
          <input type="text" value={newRule.port} onChange={e => setNewRule({ ...newRule, port: e.target.value })} placeholder="Port" className="w-full p-1 border rounded" />
          <select value={newRule.protocol} onChange={e => setNewRule({ ...newRule, protocol: e.target.value as 'TCP' | 'UDP' | 'ANY' })} className="w-full p-1 border rounded">
            <option>ANY</option>
            <option>TCP</option>
            <option>UDP</option>
          </select>
          <button onClick={addRule} className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center"><Plus className="w-4 h-4 mr-1" /> Add Rule</button>
        </div>
      </div>
    </div>
  );
};

export default FirewallSimulator;
