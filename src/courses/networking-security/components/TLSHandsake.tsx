import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Server, FileText, Key, ShieldCheck } from 'lucide-react';

const handshakeSteps = [
  { name: 'Client Hello', from: 'client', to: 'server' },
  { name: 'Server Hello', from: 'server', to: 'client' },
  { name: 'Certificate', from: 'server', to: 'client' },
  { name: 'Server Hello Done', from: 'server', to: 'client' },
  { name: 'Client Key Exchange', from: 'client', to: 'server' },
  { name: 'Change Cipher Spec', from: 'client', to: 'server' },
  { name: 'Finished', from: 'client', to: 'server' },
  { name: 'Change Cipher Spec', from: 'server', to: 'client' },
  { name: 'Finished', from: 'server', to: 'client' },
  { name: 'Secure Connection', from: 'both', to: 'both' },
];

const TLSHandsake: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, handshakeSteps.length));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const reset = () => setStep(0);

  const currentStep = handshakeSteps[step - 1];

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4 text-center">TLS Handshake Simulation</h3>
      <div className="flex justify-around items-center h-48">
        {/* Client */}
        <div className="flex flex-col items-center">
          <User size={48} />
          <span className="mt-2">Client</span>
        </div>

        {/* Message */}
        <div className="w-1/2 text-center">
          {currentStep && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-center ${currentStep.from === 'server' ? 'flex-row-reverse' : ''}`}
            >
              <div className="p-2 bg-white rounded-lg shadow">
                {currentStep.name.includes('Key') ? <Key /> : <FileText />}
                <span className="ml-2">{currentStep.name}</span>
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
            </motion.div>
          )}
          {step === handshakeSteps.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
              <ShieldCheck size={48} className="text-green-500" />
              <span className="mt-2 font-bold">Secure Connection Established</span>
            </motion.div>
          )}
        </div>

        {/* Server */}
        <div className="flex flex-col items-center">
          <Server size={48} />
          <span className="mt-2">Server</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button onClick={prevStep} disabled={step === 0} className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">
          Prev
        </button>
        <button onClick={nextStep} disabled={step === handshakeSteps.length} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50">
          Next
        </button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
          Reset
        </button>
      </div>
    </div>
  );
};

export default TLSHandsake;