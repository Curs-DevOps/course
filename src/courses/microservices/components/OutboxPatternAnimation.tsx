import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Server, Database, Mail, Send, Play, RefreshCw, FileText, X } from 'lucide-react';

type SimState = 'idle' | 'writing' | 'polling' | 'publishing' | 'deleting' | 'finished';

const OutboxPatternAnimation = () => {
  const [state, setState] = useState<SimState>('idle');
  const [db, setDb] = useState({ orders: '', outbox: '' });
  const [broker, setBroker] = useState('');

  const run = async () => {
    if (state !== 'idle') return;

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

    setState('writing');
    await wait(1000);
    setDb({ orders: 'Order #456', outbox: 'Event: OrderCreated' });

    await wait(1500);
    setState('polling');

    await wait(2500);
    setState('publishing');

    await wait(1000);
    setBroker('Event: OrderCreated');

    await wait(1000);
    setState('deleting');

    await wait(1000);
    setDb({ orders: 'Order #456', outbox: '' });

    await wait(1000);
    setState('finished');
  };

  const reset = () => {
    setState('idle');
    setDb({ orders: '', outbox: '' });
    setBroker('');
  };

  const stateText = {
    idle: 'Ready to start.',
    writing: 'Service writes to DB and Outbox in a single transaction.',
    polling: 'Message Relay polls the outbox table for new events.',
    publishing: 'Relay finds event and publishes it to the Message Broker.',
    deleting: 'Relay deletes the event from the outbox after confirmation.',
    finished: 'Process complete. Eventual consistency achieved.',
  }[state];

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><GitCommit className="w-6 h-6 text-blue-500" /> Outbox Pattern Simulation</h3>
      <div className="flex justify-center mb-4 gap-4">
        <button onClick={run} disabled={state !== 'idle'} className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 disabled:opacity-50">
          <Play/> Run Simulation
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4"/> Reset
        </button>
      </div>
      <div className="h-10 text-center mb-4 font-medium">{stateText}</div>

      <div className="grid grid-cols-3 justify-items-center items-start h-64 relative">
        {/* Service & DB */}
        <div className="flex flex-col items-center text-center">
          <Server className="w-10 h-10" />
          <span className="font-semibold">Order Service</span>
          <div className="mt-4 p-2 bg-white rounded w-56 border relative">
            <div className="font-bold flex items-center gap-1"><Database className="w-4 h-4"/> Service DB</div>
            <div className="mt-1 text-left text-sm p-1 bg-gray-100 rounded"><b>orders:</b> {db.orders}</div>
            <div className="mt-1 text-left text-sm p-1 bg-red-100 rounded"><b>outbox:</b> {db.outbox}</div>
            <AnimatePresence>
              {state === 'writing' && (
                <motion.div
                  key="tx"
                  className="absolute -inset-1 border-2 border-green-500 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="absolute -top-3 -left-2 text-xs bg-green-100 px-1 rounded">TX</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Message Relay */}
        <div className="flex flex-col items-center text-center pt-16">
          <Send className="w-10 h-10" />
          <span className="font-semibold">Message Relay</span>
        </div>

        {/* Message Broker */}
        <div className="flex flex-col items-center text-center">
          <Mail className="w-10 h-10" />
          <span className="font-semibold">Message Broker</span>
          <div className="mt-4 text-xs p-2 bg-white rounded w-56 border">
            <p><b>Received:</b> {broker}</p>
          </div>
        </div>

        <AnimatePresence>
          {/* Polling */}
          {state === 'polling' && (
            <motion.div
              key="poll"
              className="absolute"
              initial={{ x: 0, y: 100, opacity: 0, scale: 1 }}
              animate={{ x: -300, opacity: 1, transition: { duration: 1, repeat: 1, repeatType: 'reverse' } }}
            >
              <FileText className="text-blue-500" />
            </motion.div>
          )}
          {/* Publishing */}
          {state === 'publishing' && (
            <motion.div
              key="pub"
              className="absolute"
              initial={{ x: 0, y: 100, opacity: 1 }}
              animate={{ x: 300, y: 40, transition: { duration: 1.5 } }}
            >
              <Mail className="text-pink-500" />
            </motion.div>
          )}
          {/* Deleting */}
          {state === 'deleting' && (
            <motion.div
              key="del"
              className="absolute"
              initial={{ x: 0, y: 100, opacity: 0, scale: 1 }}
              animate={{ x: -300, opacity: 1, transition: { duration: 1 } }}
            >
              <X className="text-red-500 w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OutboxPatternAnimation;
