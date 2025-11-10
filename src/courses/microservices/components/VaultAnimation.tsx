
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Server, Database, Lock, Unlock } from 'lucide-react';

const VaultAnimation = () => {
  const [step, setStep] = useState(0);
  const [serviceState, setServiceState] = useState('stopped');
  const [secret, setSecret] = useState('');

  const sequence = [
    { text: 'Service starts', action: () => setServiceState('authenticating') },
    { text: 'Service authenticates to Vault', vaultState: 'authenticating' },
    { text: 'Vault returns auth token', vaultState: 'token-sent' },
    { text: 'Service requests DB secret', vaultState: 'secret-requested' },
    { text: 'Vault returns DB secret', vaultState: 'secret-sent', action: () => setSecret('db-user:db-pass') },
    { text: 'Service connects to DB', action: () => setServiceState('running') },
  ];

  const handleNextStep = () => {
    const currentStep = step % sequence.length;
    if (sequence[currentStep].action) {
      sequence[currentStep].action!();
    }
    setStep(s => s + 1);
  };

  const getVaultIcon = () => {
    const vaultState = sequence[step % sequence.length]?.vaultState;
    if (vaultState === 'authenticating' || vaultState === 'secret-requested') {
      return <Lock className="w-10 h-10 text-yellow-500" />;
    }
    if (vaultState === 'token-sent' || vaultState === 'secret-sent') {
      return <Unlock className="w-10 h-10 text-green-500" />;
    }
    return <Key className="w-10 h-10" />;
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Key className="w-6 h-6 text-gray-700" /> Vault Secrets Management</h3>
      <div className="flex justify-center mb-4">
        <button onClick={handleNextStep} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
          {step === 0 ? 'Start' : 'Next Step'} ({step % sequence.length + 1}/{sequence.length})
        </button>
        <button onClick={() => { setStep(0); setServiceState('stopped'); setSecret(''); }} className="ml-4 px-4 py-2 rounded-lg bg-gray-600 text-white">Reset</button>
      </div>
      <div className="grid grid-cols-3 justify-items-center items-center h-48 relative">
        {/* Service */}
        <div className="flex flex-col items-center text-center">
          <Server className={`w-10 h-10 ${serviceState === 'running' ? 'text-green-500' : ''}`} />
          <span className="font-semibold">My Service</span>
          <span className="text-xs p-1 bg-white rounded mt-1">State: {serviceState}</span>
          <span className="text-xs p-1 bg-white rounded mt-1 h-6">Secret: <span className="text-red-500">{secret}</span></span>
        </div>

        {/* Vault */}
        <div className="flex flex-col items-center text-center">
          {getVaultIcon()}
          <span className="font-semibold">Vault</span>
        </div>

        {/* Database */}
        <div className="flex flex-col items-center text-center">
          <Database className="w-10 h-10" />
          <span className="font-semibold">Database</span>
        </div>

        <AnimatePresence>
          {step > 0 && (step % sequence.length === 2 || step % sequence.length === 3) && (
            <motion.div key="s-to-v" className="absolute" initial={{ x: 100, opacity: 0 }} animate={{ x: 220, opacity: 1 }} exit={{ opacity: 0 }}>
              <Lock className="text-blue-500" />
            </motion.div>
          )}
          {step > 0 && (step % sequence.length === 3 || step % sequence.length === 4) && (
            <motion.div key="v-to-s" className="absolute" initial={{ x: 220, opacity: 0 }} animate={{ x: 100, opacity: 1 }} exit={{ opacity: 0 }}>
              <Unlock className="text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VaultAnimation;
