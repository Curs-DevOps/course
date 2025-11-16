import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Server } from 'lucide-react';

const layers = [
  { name: 'Application', color: '#FF6B6B' },
  { name: 'Presentation', color: '#FFD166' },
  { name: 'Session', color: '#06D6A0' },
  { name: 'Transport', color: '#118AB2' },
  { name: 'Network', color: '#073B4C' },
  { name: 'Data Link', color: '#7F5AF0' },
  { name: 'Physical', color: '#232E35' },
];

const PacketTracer: React.FC = () => {
  const [isSending, setIsSending] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAnimate = () => {
    setIsAnimating(true);
    setActiveIndex(-1);
    let current = isSending ? 0 : layers.length - 1;
    const interval = setInterval(() => {
      setActiveIndex(current);
      if (isSending) {
        current++;
        if (current >= layers.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      } else {
        current--;
        if (current < 0) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }
    }, 500);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-2xl font-semibold mb-4 text-center">OSI Model Packet Tracer</h3>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setIsSending(true)}
          className={`px-4 py-2 rounded-lg ${isSending ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Encapsulation (Sending)
        </button>
        <button
          onClick={() => setIsSending(false)}
          className={`px-4 py-2 rounded-lg ${!isSending ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          De-encapsulation (Receiving)
        </button>
        <button
          onClick={handleAnimate}
          disabled={isAnimating}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </button>
      </div>

      <div className="flex justify-between items-center">
        {/* Sender */}
        <div className="w-1/3 flex flex-col items-center">
          <Server className="w-16 h-16 mb-2" />
          <h4 className="text-lg font-semibold">Sender</h4>
        </div>

        {/* OSI Layers */}
        <div className="w-1/3 flex flex-col items-center">
          <AnimatePresence>
            <motion.div
              className="relative w-full h-96 flex flex-col justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  className="w-full p-2 rounded-lg text-white text-center"
                  style={{ backgroundColor: layer.color }}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0.5, scale: activeIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {layer.name}
                </motion.div>
              ))}
              <AnimatePresence>
                {activeIndex !== -1 && (
                  <motion.div
                    className="absolute left-0 w-full"
                    initial={{ top: isSending ? 0 : '100%' }}
                    animate={{ top: `${(activeIndex / (layers.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    <Package className="w-8 h-8 mx-auto bg-white rounded-full p-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Receiver */}
        <div className="w-1/3 flex flex-col items-center">
          <Server className="w-16 h-16 mb-2" />
          <h4 className="text-lg font-semibold">Receiver</h4>
        </div>
      </div>
    </div>
  );
};

export default PacketTracer;
