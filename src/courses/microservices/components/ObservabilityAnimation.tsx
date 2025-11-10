import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Telescope, Server, Zap } from 'lucide-react';

const services = [
  { id: 'gateway', name: 'API Gateway', x: 50 },
  { id: 'orders', name: 'Order Service', x: 200 },
  { id: 'payments', name: 'Payment Service', x: 350 },
  { id: 'inventory', name: 'Inventory Service', x: 350, xOffset: -240, yOffset: 100 },
];

// Corrected trace data: inventory is a child of orders
const traceData = [
  { id: 'a', service: 'gateway', duration: 300, offset: 0, parent: null },
  { id: 'b', service: 'orders', duration: 225, offset: 25, parent: 'a' },
  { id: 'c', service: 'payments', duration: 100, offset: 50, parent: 'b' },
  { id: 'd', service: 'inventory', duration: 75, offset: 160, parent: 'b' },
];

const ObservabilityAnimation = () => {
  const [showTrace, setShowTrace] = useState(false);

  const traceWithDepth = useMemo(() => {
    const spanMap = new Map(traceData.map(s => [s.id, { ...s, children: new Array<String>() }]));

    for (const span of traceData) {
      if (span.parent) {
        spanMap.get(span.parent)?.children.push(span.id);
      }
    }

    const getDepth = (spanId: string | null): number => {
      if (!spanId) return -1;
      const span = spanMap.get(spanId);
      if (!span || !span.parent) return 0;
      return 1 + getDepth(span.parent);
    };

    return traceData.map(span => ({ ...span, depth: getDepth(span.id) }));
  }, [traceData]);


  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Telescope className="w-6 h-6 text-indigo-500" /> Distributed Tracing</h3>
      <div className="flex justify-center mb-4">
        <button onClick={() => setShowTrace(!showTrace)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
          {showTrace ? 'Hide Trace' : 'Generate Trace'}
        </button>
      </div>

      {/* System Diagram */}
      <div className="h-64 relative flex items-center justify-around">
        {services.map(s => (
          <div key={s.id} className="flex flex-col items-center text-center" style={{ transform: `translate(${s.xOffset || 0}px, ${s.yOffset || 0}px)`}}>
            <Server className="w-8 h-8" />
            <span>{s.name}</span>
          </div>
        ))}
        {showTrace && (
          <>
            {/* Gateway -> Orders */}
            <motion.div key="req1" className="absolute" initial={{x:-350, y:0, opacity:0}} animate={{x:-170, opacity:[0,1,0], transition:{duration:1}}} exit={{opacity:0}}><Zap className="text-yellow-500"/></motion.div>
            {/* Orders -> Payments */}
            <motion.div key="req2" className="absolute" initial={{x:-160, y:0, opacity:0}} animate={{x:50, opacity:[0,1,0], transition:{delay:1, duration:1}}} exit={{opacity:0}}><Zap className="text-yellow-500"/></motion.div>
            {/* Orders -> Inventory */}
            <motion.div key="req3" className="absolute" initial={{x:-160, y:0, opacity:0}} animate={{x:50, y:120, opacity:[0,1,0], transition:{delay:1.5, duration:1}}} exit={{opacity:0}}><Zap className="text-yellow-500"/></motion.div>
          </>
        )}
      </div>

      {/* Flame Graph */}
      {showTrace && (
        <div className="mt-12 p-2 bg-gray-900 text-white rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Trace Flame Graph</h4>
          <div className="relative h-48 w-full">
            {traceWithDepth.map((span) => (
              <motion.div
                key={span.id}
                className="absolute h-6 rounded-sm px-2 flex items-center text-xs"
                style={{
                  top: span.depth * 30,
                  left: `${(span.offset / 400) * 100}%`,
                  width: `${(span.duration / 400) * 100}%`,
                  backgroundColor: `hsl(${span.depth * 60 + 180}, 70%, 50%)`,
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: span.depth * 0.1 + 0.5 } }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                {services.find(s => s.id === span.service)?.name} ({span.duration}ms)
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ObservabilityAnimation;
