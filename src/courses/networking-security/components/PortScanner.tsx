import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, ShieldCheck, ShieldX, ShieldQuestion } from 'lucide-react';

type PortStatus = 'Open' | 'Closed' | 'Filtered';

interface ScanResult {
  port: number;
  status: PortStatus;
}

const mockScan = (startPort: number, endPort: number): Promise<ScanResult[]> => {
  return new Promise(resolve => {
    const results: ScanResult[] = [];
    const openPorts = [22, 80, 443, 3306, 5432];
    const filteredPorts = [21, 25, 110];

    for (let port = startPort; port <= endPort; port++) {
      let status: PortStatus = 'Closed';
      if (openPorts.includes(port)) {
        status = 'Open';
      } else if (filteredPorts.includes(port)) {
        status = 'Filtered';
      }
      results.push({ port, status });
    }
    setTimeout(() => resolve(results), 1000);
  });
};

const PortScanner: React.FC = () => {
  const [target, setTarget] = useState('10.0.0.5');
  const [portRange, setPortRange] = useState('1-1024');
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = useCallback(async () => {
    setIsScanning(true);
    setResults([]);
    const [start, end] = portRange.split('-').map(Number);
    const scanResults = await mockScan(start, end);

    let index = 0;
    const interval = setInterval(() => {
      setResults(prev => [...prev, scanResults[index]]);
      index++;
      if (index >= scanResults.length) {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 50);
  }, [portRange]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-2 flex items-center"><ScanLine className="mr-2" /> Port Scanner</h3>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="p-2 border rounded-lg w-full"
          placeholder="Target IP"
        />
        <input
          type="text"
          value={portRange}
          onChange={e => setPortRange(e.target.value)}
          className="p-2 border rounded-lg w-48"
          placeholder="Port range (e.g., 1-1024)"
        />
        <button onClick={handleScan} disabled={isScanning} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50">
          {isScanning ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      <div className="h-64 overflow-y-auto p-2 bg-gray-900 text-white rounded-lg font-mono text-sm">
        {results.map((result, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            {result.status === 'Open' && <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />}
            {result.status === 'Closed' && <ShieldX className="w-4 h-4 mr-2 text-red-500" />}
            {result.status === 'Filtered' && <ShieldQuestion className="w-4 h-4 mr-2 text-yellow-500" />}
            Port {result.port}: {result.status}
          </motion.div>
        ))}
        {isScanning && <div className="text-gray-400">Scanning...</div>}
      </div>
    </div>
  );
};

export default PortScanner;