import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4000, tests: 2400 },
  { name: 'Feb', revenue: 3000, tests: 1398 },
  { name: 'Mar', revenue: 2000, tests: 9800 },
  { name: 'Apr', revenue: 2780, tests: 3908 },
  { name: 'May', revenue: 1890, tests: 4800 },
  { name: 'Jun', revenue: 2390, tests: 3800 },
  { name: 'Jul', revenue: 3490, tests: 4300 },
];

export default function AnalyticsModule() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Analytics & Reporting</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Laboratory performance and financial metrics</p>
        </div>
        <button className="border border-[#141414] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 border border-[#141414] bg-white"
        >
          <h3 className="text-xl font-bold uppercase tracking-tighter mb-8 italic serif">Test Volume Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141420" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: 'none', color: '#E4E3E0' }}
                  itemStyle={{ color: '#E4E3E0' }}
                />
                <Area type="monotone" dataKey="tests" stroke="#141414" fill="#14141420" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 border border-[#141414] bg-white"
        >
          <h3 className="text-xl font-bold uppercase tracking-tighter mb-8 italic serif">Revenue by Month</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141420" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: 'none', color: '#E4E3E0' }}
                  itemStyle={{ color: '#E4E3E0' }}
                  cursor={{ fill: '#14141410' }}
                />
                <Bar dataKey="revenue" fill="#141414" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
