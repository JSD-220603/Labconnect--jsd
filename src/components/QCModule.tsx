import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileBarChart } from 'lucide-react';

export default function QCModule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Quality Control</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Monitor instrument calibration and QC runs</p>
        </div>
        <button className="bg-[#141414] text-[#E4E3E0] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity">
          <FileBarChart className="w-4 h-4" />
          Generate QC Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { instrument: 'Cobas 6000', status: 'PASS', lastRun: '10 mins ago', issues: 0 },
          { instrument: 'Sysmex XN-1000', status: 'WARNING', lastRun: '1 hour ago', issues: 1 },
          { instrument: 'Architect i2000', status: 'FAIL', lastRun: '2 hours ago', issues: 3 },
          { instrument: 'Alegria', status: 'PASS', lastRun: '4 hours ago', issues: 0 },
          { instrument: 'Vidas 3', status: 'PASS', lastRun: '5 hours ago', issues: 0 },
        ].map((qc, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 border border-[#141414] bg-white relative overflow-hidden ${
              qc.status === 'FAIL' ? 'border-red-500' : qc.status === 'WARNING' ? 'border-orange-500' : ''
            }`}
          >
            {qc.status === 'FAIL' && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
            {qc.status === 'WARNING' && <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />}
            {qc.status === 'PASS' && <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />}
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold uppercase tracking-tighter">{qc.instrument}</h3>
              {qc.status === 'PASS' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {qc.status === 'WARNING' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
              {qc.status === 'FAIL' && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="opacity-40">Status</span>
                <span className={
                  qc.status === 'PASS' ? 'text-green-600' : 
                  qc.status === 'WARNING' ? 'text-orange-600' : 'text-red-600'
                }>{qc.status}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="opacity-40">Last Run</span>
                <span>{qc.lastRun}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="opacity-40">Deviations</span>
                <span>{qc.issues}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#14141410]">
              <button className="w-full text-center text-[10px] font-bold uppercase tracking-widest hover:underline">
                View Levey-Jennings Chart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
