
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Share2, Zap, CheckCircle, XCircle } from 'lucide-react';

const initialServices = {
  'users-1': { id: 'users-1', name: 'Users Service', ip: '10.0.1.2', status: 'healthy' },
  'users-2': { id: 'users-2', name: 'Users Service', ip: '10.0.1.3', status: 'healthy' },
  'products-1': { id: 'products-1', name: 'Products Service', ip: '10.0.2.5', status: 'healthy' },
};

const ServiceDiscoveryAnimation = () => {
  const [registry, setRegistry] = useState(initialServices);
  const [lastRequest, setLastRequest] = useState<{ serviceName: string; instance?: any; status: string } | null>(null);
  const [requests, setRequests] = useState<any[]>([]);

  const toggleServiceStatus = (id: string) => {
    setRegistry((prev: any) => {
      const newStatus = prev[id].status === 'healthy' ? 'unhealthy' : 'healthy';
      return { ...prev, [id]: { ...prev[id], status: newStatus } };
    });
  };

  const handleClientRequest = useCallback((serviceName: string) => {
    const availableInstances = Object.values(registry).filter(s => s.name === serviceName && s.status === 'healthy');
    const instance = availableInstances[Math.floor(Math.random() * availableInstances.length)];
    const reqId = Date.now();

    setRequests(prev => [...prev, { id: reqId, serviceName, instance }]);

    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.id !== reqId));
    }, 2000);

    setLastRequest({ serviceName, instance, status: instance ? 'resolved' : 'unresolved' });
  }, [registry]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Share2 className="w-6 h-6 text-cyan-500" /> Service Discovery Simulation</h3>
      <div className="flex gap-6">
        {/* Client */}
        <div className="w-1/4 space-y-2">
          <h4 className="font-semibold">Client</h4>
          <button onClick={() => handleClientRequest('Users Service')} className="w-full p-2 rounded bg-blue-100 hover:bg-blue-200 text-sm">Request Users Service</button>
          <button onClick={() => handleClientRequest('Products Service')} className="w-full p-2 rounded bg-green-100 hover:bg-green-200 text-sm">Request Products Service</button>
          {lastRequest && (
            <div className={`p-2 rounded text-sm ${lastRequest.status === 'resolved' ? 'bg-green-100' : 'bg-red-100'}`}>
              {lastRequest.status === 'resolved'
                ? `Resolved ${lastRequest.serviceName} to ${lastRequest.instance.ip}`
                : `Failed to resolve ${lastRequest.serviceName}`
              }
            </div>
          )}
        </div>

        {/* Discovery Server */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="w-40 h-40 bg-cyan-200 rounded-full flex items-center justify-center">
            <Share2 className="w-16 h-16 text-cyan-600" />
            <span className="absolute -top-2 text-sm font-semibold">Discovery Server</span>
          </div>
          <AnimatePresence>
            {requests.map(req => (
              <motion.div
                key={req.id}
                className="absolute"
                initial={{ x: -150, y: 0, opacity: 0 }}
                animate={{ x: -50, opacity: 1, transition: { duration: 0.5 } }}
                exit={{
                  x: req.instance ? 150 : -150,
                  y: req.instance ? (Object.values(registry).findIndex(s => s.id === req.instance.id) - 1) * 60 : 0,
                  opacity: 0,
                  transition: { duration: 1 }
                }}
              >
                <Zap className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Services */}
        <div className="w-1/4 space-y-3">
          <h4 className="font-semibold">Registered Services</h4>
          {Object.values(registry).map(service => (
            <div key={service.id} className="flex items-center gap-2 text-sm">
              <Server className={`w-5 h-5 ${service.status === 'healthy' ? 'text-green-500' : 'text-red-500'}`} />
              <span>{service.name} ({service.ip})</span>
              <button onClick={() => toggleServiceStatus(service.id)} className="ml-auto">
                {service.status === 'healthy' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDiscoveryAnimation;
