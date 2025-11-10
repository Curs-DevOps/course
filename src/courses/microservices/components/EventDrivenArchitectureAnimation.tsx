
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Mail, ShoppingCart } from 'lucide-react';

const services = {
  orders: { id: 'orders', name: 'Order Service', icon: <ShoppingCart /> },
  payments: { id: 'payments', name: 'Payment Service', icon: <Send /> },
  notifications: { id: 'notifications', name: 'Notification Service', icon: <Mail /> },
};

const EventDrivenArchitectureAnimation = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [mode, setMode] = useState<'queue' | 'pubsub'>('queue');

  const publishEvent = () => {
    const eventId = Date.now();
    const newEvent = {
      id: eventId,
      type: 'OrderCreated',
      producer: 'orders',
      consumers: mode === 'queue' ? ['payments'] : ['payments', 'notifications'],
    };
    setEvents(prev => [...prev, newEvent]);
    setTimeout(() => setEvents(prev => prev.filter(e => e.id !== eventId)), 3000);
  };

  const getConsumerPosition = (consumerId: string) => {
    const serviceIds = Object.keys(services);
    const index = serviceIds.findIndex(id => id === consumerId);
    if (index == 1) {
      return { x: 750, y: -70 };
    }
    return { x: 750, y: 70 };
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-6 h-6 text-pink-500" /> Event-Driven Architecture</h3>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setMode('queue')} className={`px-3 py-1 rounded ${mode === 'queue' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>Message Queue</button>
        <button onClick={() => setMode('pubsub')} className={`px-3 py-1 rounded ${mode === 'pubsub' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}>Publish/Subscribe</button>
      </div>
      <div className="grid grid-cols-3 items-center h-64 relative">
        {/* Producer */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">{services.orders.icon}</div>
          <span>{services.orders.name}</span>
          <button onClick={publishEvent} className="mt-2 px-3 py-1 rounded bg-blue-500 text-white text-sm">Publish Event</button>
        </div>

        {/* Broker */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-lg bg-pink-200 flex items-center justify-center">
            <MessageSquare className="w-12 h-12 text-pink-600" />
          </div>
          <span className="font-semibold">{mode === 'queue' ? 'Queue' : 'Topic'}</span>
        </div>

        {/* Consumers */}
        <div className="flex flex-col items-center space-y-8">
          {Object.values(services).filter(s => s.id !== 'orders').map(service => (
            <div key={service.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">{service.icon}</div>
              <span>{service.name}</span>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {events.map(event => (
            <React.Fragment key={event.id}>
              {/* Producer to Broker */}
              <motion.div
                className="absolute"
                initial={{ x: 100, y: 0, opacity: 0 }}
                animate={{ x: 510, opacity: [1, 0], transition: { duration: 1 } }}
              >
                <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              </motion.div>
              {/* Broker to Consumers */}
              {event.consumers.map((consumerId: string) => (
                <motion.div
                  key={`${event.id}-${consumerId}`}
                  className="absolute"
                  initial={{ x: 510, y: 0, opacity: 0 }}
                  animate={{
                    ...getConsumerPosition(consumerId),
                    opacity: [0, 1, 0],
                    transition: { delay: 1, duration: 2 }
                  }}
                >
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDrivenArchitectureAnimation;
