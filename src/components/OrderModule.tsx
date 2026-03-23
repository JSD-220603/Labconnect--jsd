import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Download, FileText, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

const initialOrders: Order[] = [
  { id: 'ORD-2026-001', patientName: 'Alice Johnson', tests: ['CBC', 'Lipid Profile'], status: 'COMPLETED', createdAt: '2026-03-22 09:15', specimenId: 'SPEC-001' },
  { id: 'ORD-2026-002', patientName: 'Bob Smith', tests: ['HbA1c', 'Liver Function'], status: 'PROCESSING', createdAt: '2026-03-22 10:30', specimenId: 'SPEC-002' },
  { id: 'ORD-2026-003', patientName: 'Charlie Brown', tests: ['Thyroid Panel'], status: 'PENDING', createdAt: '2026-03-22 11:45' },
  { id: 'ORD-2026-004', patientName: 'Diana Prince', tests: ['Urinalysis', 'Electrolytes'], status: 'COLLECTED', createdAt: '2026-03-22 13:20', specimenId: 'SPEC-003' },
  { id: 'ORD-2026-005', patientName: 'Edward Norton', tests: ['Vitamin D', 'B12'], status: 'AUTHORIZED', createdAt: '2026-03-21 15:10', specimenId: 'SPEC-004' },
];

export default function OrderModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newOrderPatient, setNewOrderPatient] = useState('');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'AUTHORIZED': return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
      case 'PROCESSING': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'PENDING': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderPatient) return;
    
    const newOrder: Order = {
      id: `ORD-2026-00${orders.length + 1}`,
      patientName: newOrderPatient,
      tests: ['Basic Metabolic Panel'],
      status: 'PENDING',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    
    setOrders([newOrder, ...orders]);
    setIsNewOrderModalOpen(false);
    setNewOrderPatient('');
  };

  const filteredOrders = orders.filter(o => 
    o.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Order Management</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Track and manage laboratory test orders</p>
        </div>
        <button 
          onClick={() => setIsNewOrderModalOpen(true)}
          className="bg-[#141414] text-[#E4E3E0] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Lab Order
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 border border-[#141414] bg-white">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
          <input 
            type="text"
            placeholder="Search by Patient Name or Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border border-[#14141410] p-2 pl-10 focus:outline-none focus:border-[#141414] transition-colors font-medium"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#141414] flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <button className="px-4 py-2 border border-[#141414] flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-[#141414] bg-white overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#141414] bg-[#14141405]">
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Order ID</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Patient</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Tests</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Created At</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest opacity-50">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#14141410]">
            <AnimatePresence>
              {filteredOrders.map((order, i) => (
                <motion.tr 
                  key={order.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-[#14141405] transition-colors group"
                >
                  <td className="p-4 font-mono text-xs font-bold">{order.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-sm">{order.patientName}</div>
                    <div className="text-[10px] opacity-40 uppercase tracking-widest">Specimen: {order.specimenId || 'N/A'}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {order.tests.map((test, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#14141410] text-[9px] font-bold uppercase tracking-widest">
                          {test}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{order.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium opacity-60">{order.createdAt}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-sm font-bold uppercase tracking-widest opacity-40">
            No orders found
          </div>
        )}
      </div>

      {/* New Order Modal */}
      <AnimatePresence>
        {isNewOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#E4E3E0] border-2 border-[#141414] p-8 max-w-md w-full shadow-[16px_16px_0_0_#141414]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">New Order</h3>
                <button onClick={() => setIsNewOrderModalOpen(false)} className="p-2 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateOrder} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Patient Name</label>
                  <input 
                    type="text" 
                    required
                    value={newOrderPatient}
                    onChange={(e) => setNewOrderPatient(e.target.value)}
                    className="w-full border-2 border-[#141414] bg-white p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[#141414]/20"
                    placeholder="Enter patient name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Select Tests</label>
                  <select className="w-full border-2 border-[#141414] bg-white p-3 font-medium focus:outline-none focus:ring-2 focus:ring-[#141414]/20">
                    <option>Basic Metabolic Panel</option>
                    <option>Complete Blood Count</option>
                    <option>Lipid Panel</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#141414] text-[#E4E3E0] py-4 font-bold uppercase tracking-widest hover:bg-[#141414]/90 transition-colors"
                >
                  Create Order
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
