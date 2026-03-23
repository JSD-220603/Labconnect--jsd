import React from 'react';
import { Search, Plus, Edit2, Trash2, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Test } from '../types';

const mockTests: Test[] = [
  { id: 'T-001', name: 'Complete Blood Count', category: 'Hematology', price: 25.00, parameters: ['WBC', 'RBC', 'HGB', 'HCT', 'PLT'] },
  { id: 'T-002', name: 'Lipid Profile', category: 'Biochemistry', price: 45.00, parameters: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
  { id: 'T-003', name: 'HbA1c', category: 'Endocrinology', price: 35.00, parameters: ['Glycated Hemoglobin'] },
  { id: 'T-004', name: 'Liver Function Test', category: 'Biochemistry', price: 55.00, parameters: ['ALT', 'AST', 'ALP', 'Bilirubin'] },
];

export default function CatalogModule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Test Catalog</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Manage laboratory tests, parameters, and panels</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#141414] text-[#E4E3E0] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Add New Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTests.map((test, i) => (
          <motion.div 
            key={test.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 border border-[#141414] bg-white group hover:bg-[#141414] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 border border-[#141414] group-hover:border-[#E4E3E0] group-hover:text-[#E4E3E0]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold tracking-tighter group-hover:text-[#E4E3E0]">${test.price.toFixed(2)}</div>
            </div>
            
            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:text-[#E4E3E0]/60 mb-1">{test.category}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter group-hover:text-[#E4E3E0]">{test.name}</h3>
            </div>

            <div className="space-y-2 mb-8">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:text-[#E4E3E0]/60">Parameters</div>
              <div className="flex flex-wrap gap-1">
                {test.parameters.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 border border-[#14141420] text-[9px] font-bold uppercase tracking-widest group-hover:border-[#E4E3E040] group-hover:text-[#E4E3E0]">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#14141410] group-hover:border-[#E4E3E020]">
              <button className="p-2 hover:bg-[#14141420] group-hover:text-[#E4E3E0] transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-red-500 hover:text-white group-hover:text-[#E4E3E0] transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
