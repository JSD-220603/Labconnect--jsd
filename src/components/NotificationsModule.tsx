import React from 'react';
import { motion } from 'motion/react';
import { Bell, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function NotificationsModule() {
  const notifications = [
    { id: 1, type: 'CRITICAL', message: 'Critical value detected for Order #ORD-2026-001 (Hemoglobin: 6.2 g/dL)', time: '2 mins ago', read: false },
    { id: 2, type: 'WARNING', message: 'Instrument Sysmex XN-1000 requires calibration', time: '15 mins ago', read: false },
    { id: 3, type: 'INFO', message: 'Daily backup completed successfully', time: '1 hour ago', read: true },
    { id: 4, type: 'SUCCESS', message: 'Batch #452 authorized by Dr. Wilson', time: '2 hours ago', read: true },
    { id: 5, type: 'WARNING', message: 'Reagent inventory low for Glucose tests', time: '3 hours ago', read: true },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">System Alerts</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Notifications and critical alerts</p>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="border border-[#141414] bg-white divide-y divide-[#14141410]">
        {notifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-6 flex items-start gap-4 transition-colors hover:bg-[#14141405] ${notif.read ? 'opacity-60' : ''}`}
          >
            <div className={`p-2 rounded-full ${
              notif.type === 'CRITICAL' ? 'bg-red-100 text-red-600' :
              notif.type === 'WARNING' ? 'bg-orange-100 text-orange-600' :
              notif.type === 'SUCCESS' ? 'bg-green-100 text-green-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {notif.type === 'CRITICAL' && <AlertCircle className="w-5 h-5" />}
              {notif.type === 'WARNING' && <AlertCircle className="w-5 h-5" />}
              {notif.type === 'SUCCESS' && <CheckCircle2 className="w-5 h-5" />}
              {notif.type === 'INFO' && <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm font-bold ${notif.read ? '' : 'text-[#141414]'}`}>{notif.message}</h4>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 whitespace-nowrap ml-4">{notif.time}</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{notif.type}</div>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
