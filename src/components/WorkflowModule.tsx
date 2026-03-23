import React from 'react';
import { Activity, ArrowRight, CheckCircle2, Clock, FlaskConical, Microscope } from 'lucide-react';
import { motion } from 'motion/react';
import { WorkflowStep } from '../types';

const mockWorkflow: WorkflowStep[] = [
  { id: 'WS-001', orderId: 'ORD-2026-001', stage: 'POST-ANALYTICAL', status: 'COMPLETED', updatedAt: '2026-03-22 14:30' },
  { id: 'WS-002', orderId: 'ORD-2026-002', stage: 'ANALYTICAL', status: 'IN_PROGRESS', updatedAt: '2026-03-22 15:15' },
  { id: 'WS-003', orderId: 'ORD-2026-003', stage: 'ACCESSIONING', status: 'IN_PROGRESS', updatedAt: '2026-03-22 16:00' },
  { id: 'WS-004', orderId: 'ORD-2026-004', stage: 'PRE-ANALYTICAL', status: 'COMPLETED', updatedAt: '2026-03-22 15:45' },
];

export default function WorkflowModule() {
  const stages = [
    { id: 'ACCESSIONING', icon: FlaskConical, label: 'Accessioning' },
    { id: 'PRE-ANALYTICAL', icon: Clock, label: 'Pre-Analytical' },
    { id: 'ANALYTICAL', icon: Microscope, label: 'Analytical' },
    { id: 'POST-ANALYTICAL', icon: CheckCircle2, label: 'Post-Analytical' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold uppercase tracking-tighter">Workflow Engine</h2>
        <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Monitor and manage laboratory processing stages</p>
      </div>

      {/* Workflow Visualizer */}
      <div className="p-8 border border-[#141414] bg-white">
        <div className="flex justify-between items-center relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#14141410] -translate-y-1/2 z-0" />
          
          {stages.map((stage, i) => (
            <motion.div 
              key={stage.id} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className={`w-16 h-16 flex items-center justify-center border-2 border-[#141414] bg-white transition-colors ${
                i === 2 ? 'bg-[#141414] text-[#E4E3E0]' : ''
              }`}>
                <stage.icon className="w-8 h-8" />
              </div>
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest">{stage.label}</div>
                <div className="text-[9px] opacity-40 font-bold uppercase tracking-widest">
                  {i === 2 ? '12 Active' : '0 Active'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Runs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#141414] bg-white"
        >
          <div className="p-6 border-b border-[#141414] flex justify-between items-center">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic serif">Active Instrument Runs</h3>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div className="p-6 space-y-6">
            {[
              { instrument: 'Cobas 6000', test: 'Chemistry Panel', progress: 65, timeRemaining: '12m' },
              { instrument: 'Sysmex XN-1000', test: 'CBC with Diff', progress: 30, timeRemaining: '4m' },
              { instrument: 'Architect i2000', test: 'Immunoassay', progress: 90, timeRemaining: '2m' },
            ].map((run, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest">{run.instrument}</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest">{run.test}</div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">{run.timeRemaining} left</div>
                </div>
                <div className="h-2 bg-[#14141410] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${run.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-[#141414]" 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stage Tracking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-[#141414] bg-white"
        >
          <div className="p-6 border-b border-[#141414]">
            <h3 className="text-xl font-bold uppercase tracking-tighter italic serif">Stage Transition Log</h3>
          </div>
          <div className="divide-y divide-[#14141410]">
            {mockWorkflow.map((step, i) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 flex justify-between items-center hover:bg-[#14141405] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 border border-[#141414] ${
                    step.status === 'COMPLETED' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest">{step.orderId}</div>
                    <div className="text-[10px] opacity-60 uppercase tracking-widest">Moved to {step.stage}</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{step.updatedAt}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
