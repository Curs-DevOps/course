
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Shield, Route } from 'lucide-react';

const services = [
  { id: 'users', name: 'Users Service', icon: <Server className="w-8 h-8 text-blue-500" /> },
  { id: 'products', name: 'Products Service', icon: <Server className="w-8 h-8 text-green-500" /> },
  { id: 'orders', name: 'Orders Service', icon: <Server className="w-8 h-8 text-yellow-500" /> },
];

interface ApiGatewaySimulationProps {
  routes: { [key: string]: string };
}

const ApiGatewaySimulation: React.FC<ApiGatewaySimulationProps> = ({ routes }) => {
  const [requests, setRequests] = useState<{ id: number; path: string; target?: string; status: 'pending' | 'success' | 'error' }[]>([]);

  const handleRequest = (path: string) => {
    const target = routes[path as keyof typeof routes];
    const newRequest = { id: Date.now(), path, target, status: 'pending' as const };
    setRequests(prev => [...prev, newRequest]);

    setTimeout(() => {
      setRequests(prev => prev.map(req =>
        req.id === newRequest.id ? { ...req, status: target ? 'success' : 'error' } : req
      ));
    }, 1500);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Route className="w-6 h-6 text-indigo-500" /> API Gateway Simulation</h3>
      <div className="flex gap-8">
        <div className="w-1/3">
          <h4 className="font-semibold mb-2">Client Requests</h4>
          <div className="space-y-2">
            <button onClick={() => handleRequest('/api/users')} className="w-full p-2 rounded bg-blue-100 hover:bg-blue-200 text-sm">GET /api/users</button>
            <button onClick={() => handleRequest('/api/products')} className="w-full p-2 rounded bg-green-100 hover:bg-green-200 text-sm">GET /api/products</button>
            <button onClick={() => handleRequest('/api/orders')} className="w-full p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-sm">GET /api/orders</button>
          </div>
          <div className="mt-4 p-2 border rounded bg-white h-32 overflow-y-auto">
            <h5 className="text-sm font-semibold">Request Log:</h5>
            {requests.map(req => (
              <div key={req.id} className={`text-xs ${req.status === 'error' ? 'text-red-500' : 'text-gray-600'}`}>
                {req.path} -&gt; {req.target || 'N/A'} ({req.status})
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-8 w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-indigo-600" />
            <span className="absolute -top-4 text-sm font-semibold">API Gateway</span>
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around">
            {services.map((service) => (
              <div key={service.id} className="flex items-center gap-2">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">{service.icon}</div>
                <span className="text-sm">{service.name}</span>
              </div>
            ))}
          </div>

          {requests.map((req) => {
            const targetService = services.findIndex(s => s.id === req.target);
            if ((req.status === 'pending' || req.status === 'success') && targetService !== -1) {
              return (
                <motion.div
                  key={req.id}
                  className="absolute"
                  initial={{ x: 0, y: 100, opacity: 0 }}
                  animate={{ x: [100, 250], y: [100, 40 + targetService * 100], opacity: [1, 1, 0] }}
                  transition={{ duration: 1.5, times: [0, 0.8, 1] }}
                >
                  <Zap className="w-6 h-6 text-yellow-400" />
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="mt-4 p-2 border rounded bg-white">
        <h5 className="text-sm font-semibold">Gateway Routes:</h5>
        <pre className="text-xs">{JSON.stringify(routes, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ApiGatewaySimulation;
