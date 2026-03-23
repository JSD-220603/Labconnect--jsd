import React, { useState } from 'react';
import { Beaker, CheckCircle2, AlertCircle, Search, Filter, ShieldCheck, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TestResult } from '../types';

const initialResults: TestResult[] = [
  { id: 'RES-001', orderId: 'ORD-2026-001', testName: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '13.5 - 17.5', status: 'FINAL', authorizedBy: 'Dr. Sarah Wilson' },
  { id: 'RES-002', orderId: 'ORD-2026-001', testName: 'WBC Count', value: '7.5', unit: 'x10^9/L', referenceRange: '4.5 - 11.0', status: 'FINAL', authorizedBy: 'Dr. Sarah Wilson' },
  { id: 'RES-003', orderId: 'ORD-2026-002', testName: 'Glucose (Fasting)', value: '112', unit: 'mg/dL', referenceRange: '70 - 99', status: 'PRELIMINARY' },
  { id: 'RES-004', orderId: 'ORD-2026-002', testName: 'ALT', value: '35', unit: 'U/L', referenceRange: '7 - 56', status: 'PRELIMINARY' },
];

export default function ResultModule() {
  const [results, setResults] = useState<TestResult[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleVerify = (id: string) => {
    setResults(results.map(r => 
      r.id === id ? { ...r, status: 'FINAL', authorizedBy: 'Current User' } : r
    ));
  };

  const handleAuthorizeAll = () => {
    setResults(results.map(r => 
      r.status === 'PRELIMINARY' ? { ...r, status: 'FINAL', authorizedBy: 'Current User' } : r
    ));
  };

  const filteredResults = results.filter(r => {
    const matchesSearch = r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || r.testName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || r.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Result Processing</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Enter, verify, and authorize laboratory results</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAuthorizeAll}
            className="bg-[#141414] text-[#E4E3E0] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <UserCheck className="w-4 h-4" />
            Authorize Pending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search & Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border border-[#141414] bg-white space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Search Results</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input 
                type="text"
                placeholder="Order ID or Test..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border border-[#141414] p-2 pl-10 focus:outline-none font-medium text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Status Filter</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Preliminary', 'Final'].map((status) => (
                  <button 
                    key={status} 
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 border border-[#141414] text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      filter === status ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414] hover:text-[#E4E3E0]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border border-[#141414] bg-[#141414] text-[#E4E3E0] space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Quality Control</h3>
            </div>
            <p className="text-xs opacity-60 leading-relaxed">
              All results must pass internal QC checks before authorization. Pathologist review is required for all critical values.
            </p>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {filteredResults.map((result, i) => (
              <motion.div 
                key={result.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 border border-[#141414] bg-white hover:shadow-[8px_8px_0_0_#14141410] transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{result.orderId}</div>
                    <h4 className="text-xl font-bold uppercase tracking-tighter">{result.testName}</h4>
                  </div>
                  <div className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    result.status === 'FINAL' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {result.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8 items-end">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Result Value</div>
                    <div className="text-3xl font-bold tracking-tighter">
                      {result.value} <span className="text-sm opacity-40">{result.unit}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Reference Range</div>
                    <div className="text-sm font-bold">{result.referenceRange}</div>
                  </div>
                  <div className="text-right">
                    {result.authorizedBy ? (
                      <div className="flex flex-col items-end">
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Authorized By</div>
                        <div className="flex items-center gap-1 text-xs font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          {result.authorizedBy}
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleVerify(result.id)}
                        className="text-xs font-bold uppercase tracking-widest border-b-2 border-[#141414] hover:opacity-60 transition-opacity"
                      >
                        Verify Result
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredResults.length === 0 && (
            <div className="p-8 text-center text-sm font-bold uppercase tracking-widest opacity-40 border border-[#141414] bg-white">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
