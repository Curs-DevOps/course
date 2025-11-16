import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const osiLayers = [
  { name: '7. Application', description: 'Provides network services to the end-user applications. (HTTP, FTP, SMTP)' },
  { name: '6. Presentation', description: 'Translates, encrypts, and compresses data. (SSL, JPEG, MPEG)' },
  { name: '5. Session', description: 'Establishes, manages, and terminates connections between applications. (APIs, Sockets)' },
  { name: '4. Transport', description: 'Provides reliable data transfer between end systems. (TCP, UDP)' },
  { name: '3. Network', description: 'Determines the best path to move data from source to destination. (IP, ICMP)' },
  { name: '2. Data Link', description: 'Transfers data between adjacent network nodes in a WAN or LAN. (Ethernet, MAC)' },
  { name: '1. Physical', description: 'Transmits raw bit stream over the physical medium. (Cables, Hubs)' },
];

const OSILayers: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState(osiLayers[0]);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex space-x-4 h-[400px]">
      <div className="w-1/3">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><Layers className="mr-2" /> OSI Model</h3>
        <div className="space-y-2">
          {osiLayers.map((layer) => (
            <motion.div
              key={layer.name}
              onClick={() => setSelectedLayer(layer)}
              className={`p-2 rounded-lg cursor-pointer ${selectedLayer.name === layer.name ? 'bg-blue-500 text-white' : 'bg-white'}`}
              whileHover={{ scale: 1.05 }}
            >
              {layer.name}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-2/3 p-4 bg-white rounded-lg">
        <h3 className="text-2xl font-bold mb-2">{selectedLayer.name}</h3>
        <p className="text-lg">{selectedLayer.description}</p>
      </div>
    </div>
  );
};

export default OSILayers;