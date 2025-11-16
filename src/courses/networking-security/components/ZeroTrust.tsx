import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Laptop, Database, ShieldCheck, ShieldX } from 'lucide-react';

interface AccessRequest {
  user: string;
  device: string;
  resource: string;
  userVerified: boolean;
  deviceCompliant: boolean;
}

const ZeroTrust: React.FC = () => {
  const [request, setRequest] = useState<AccessRequest>({
    user: 'Alice',
    device: 'Laptop-A1',
    resource: 'CustomerDB',
    userVerified: true,
    deviceCompliant: true,
  });
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);

  const checkAccess = () => {
    if (request.userVerified && request.deviceCompliant) {
      setAccessGranted(true);
    } else {
      setAccessGranted(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4 text-center">Zero Trust Access Model</h3>
      <div className="grid grid-cols-3 gap-4 items-center h-48">
        {/* User and Device */}
        <div className="flex flex-col items-center">
          <User size={48} className={request.userVerified ? 'text-green-500' : 'text-red-500'} />
          <span>{request.user}</span>
          <Laptop size={48} className={request.deviceCompliant ? 'text-green-500' : 'text-red-500'} />
          <span>{request.device}</span>
        </div>

        {/* PDP (Policy Decision Point) */}
        <div className="flex flex-col items-center">
          <motion.div
            animate={accessGranted !== null ? { scale: [1, 1.2, 1] } : {}}
          >
            {accessGranted === true && <ShieldCheck size={64} className="text-green-500" />}
            {accessGranted === false && <ShieldX size={64} className="text-red-500" />}
            {accessGranted === null && <ShieldCheck size={64} className="text-gray-400" />}
          </motion.div>
          <span className="mt-2">Policy Engine</span>
        </div>

        {/* Resource */}
        <div className="flex flex-col items-center">
          <Database size={48} className="text-blue-500" />
          <span>{request.resource}</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h4 className="font-semibold mb-2">Access Request Details</h4>
        <div className="flex justify-around">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="user-verified"
              checked={request.userVerified}
              onChange={e => setRequest({ ...request, userVerified: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="user-verified">User Verified (MFA)</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="device-compliant"
              checked={request.deviceCompliant}
              onChange={e => setRequest({ ...request, deviceCompliant: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="device-compliant">Device Compliant (Patched)</label>
          </div>
          <button onClick={checkAccess} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZeroTrust;
