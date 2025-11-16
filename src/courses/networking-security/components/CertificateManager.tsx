import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileLock, User, ShieldCheck, XCircle } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  valid: boolean;
}

const CertificateManager: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCertName, setNewCertName] = useState('');
  const [caSigned, setCaSigned] = useState(false);

  const createCertificate = () => {
    if (newCertName) {
      setCertificates([...certificates, { id: Date.now(), name: newCertName, issuer: 'Self-Signed', valid: true }]);
      setNewCertName('');
    }
  };

  const signWithCA = (id: number) => {
    setCertificates(certificates.map(cert =>
      cert.id === id ? { ...cert, issuer: 'Trusted CA', valid: true } : cert
    ));
    setCaSigned(true);
  };

  const revokeCertificate = (id: number) => {
    setCertificates(certificates.map(cert =>
      cert.id === id ? { ...cert, valid: false } : cert
    ));
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4 text-center">Certificate Manager Simulation</h3>
      <div className="flex justify-around items-center mb-6">
        <div className="flex flex-col items-center">
          <User size={48} />
          <span className="mt-2">User/Server</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck size={48} className={caSigned ? 'text-green-500' : 'text-gray-400'} />
          <span className="mt-2">Certificate Authority</span>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={newCertName}
          onChange={e => setNewCertName(e.target.value)}
          placeholder="Certificate Name"
          className="p-2 border rounded-lg w-1/2 mr-2"
        />
        <button onClick={createCertificate} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Create Self-Signed Cert
        </button>
      </div>

      <div className="space-y-2 h-48 overflow-y-auto p-2 bg-white rounded-lg shadow">
        {certificates.length === 0 && <p className="text-gray-500 text-center">No certificates yet.</p>}
        {certificates.map(cert => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between p-2 rounded-lg ${cert.valid ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className="flex items-center">
              {cert.valid ? <FileLock className="mr-2 text-green-600" /> : <XCircle className="mr-2 text-red-600" />}
              <div>
                <p className="font-semibold">{cert.name}</p>
                <p className="text-sm text-gray-600">Issuer: {cert.issuer} | Status: {cert.valid ? 'Valid' : 'Revoked'}</p>
              </div>
            </div>
            <div className="space-x-2">
              {cert.valid && cert.issuer === 'Self-Signed' && (
                <button onClick={() => signWithCA(cert.id)} className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm">
                  Sign with CA
                </button>
              )}
              {cert.valid && (
                <button onClick={() => revokeCertificate(cert.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">
                  Revoke
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CertificateManager;
