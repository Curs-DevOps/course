import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

const ipToLong = (ip: string): number => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

const longToIp = (long: number): string => {
  return [ (long >>> 24), (long >>> 16) & 255, (long >>> 8) & 255, long & 255 ].join('.');
};

const SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.0.1');
  const [cidr, setCidr] = useState(24);

  const subnetInfo = useMemo(() => {
    try {
      const ipLong = ipToLong(ip);
      const mask = -1 << (32 - cidr);
      const networkLong = ipLong & mask;
      const broadcastLong = networkLong | (~mask >>> 0);
      const networkAddress = longToIp(networkLong);
      const broadcastAddress = longToIp(broadcastLong);
      const firstHost = longToIp(networkLong + 1);
      const lastHost = longToIp(broadcastLong - 1);
      const numHosts = Math.pow(2, 32 - cidr) - 2;

      return {
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        numHosts: numHosts > 0 ? numHosts : 0,
        error: null,
      };
    } catch (e) {
      return { error: 'Invalid IP address or CIDR.' };
    }
  }, [ip, cidr]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-2 flex items-center"><Calculator className="mr-2" /> Subnet Calculator</h3>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={ip}
          onChange={e => setIp(e.target.value)}
          className="p-2 border rounded-lg w-full"
          placeholder="IP Address (e.g., 192.168.0.1)"
        />
        <div className="flex items-center">
          <span>/</span>
          <input
            type="number"
            value={cidr}
            onChange={e => setCidr(parseInt(e.target.value))}
            min="0"
            max="32"
            className="p-2 border rounded-lg w-20 ml-2"
          />
        </div>
      </div>

      {subnetInfo.error ? (
        <div className="text-red-500">{subnetInfo.error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-2 bg-white rounded-lg shadow">
            <h4 className="font-bold text-gray-600">Network Address</h4>
            <p className="text-lg">{subnetInfo.networkAddress}</p>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <h4 className="font-bold text-gray-600">Broadcast Address</h4>
            <p className="text-lg">{subnetInfo.broadcastAddress}</p>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <h4 className="font-bold text-gray-600">Valid Host Range</h4>
            <p className="text-lg">{subnetInfo.firstHost} - {subnetInfo.lastHost}</p>
          </div>
          <div className="p-2 bg-white rounded-lg shadow">
            <h4 className="font-bold text-gray-600">Number of Usable Hosts</h4>
            <p className="text-lg">{subnetInfo.numHosts}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubnetCalculator;
