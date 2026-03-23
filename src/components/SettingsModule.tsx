import React from 'react';
import { motion } from 'motion/react';
import { Save, User, Building, Shield, Bell } from 'lucide-react';

export default function SettingsModule() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Settings</h2>
          <p className="opacity-60 text-sm uppercase tracking-widest font-bold italic serif">Manage application preferences and configurations</p>
        </div>
        <button className="bg-[#141414] text-[#E4E3E0] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'lab', label: 'Laboratory', icon: Building },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
          ].map((tab, i) => (
            <button 
              key={tab.id}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                i === 0 ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#14141405] text-[#141414]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          <div className="p-8 border border-[#141414] bg-white space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tighter border-b border-[#14141410] pb-4">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</label>
                <input type="text" defaultValue="Admin User" className="w-full border border-[#141414] p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#141414]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Email Address</label>
                <input type="email" defaultValue="admin@labconnect.com" className="w-full border border-[#141414] p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#141414]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Role</label>
                <input type="text" defaultValue="System Administrator" disabled className="w-full border border-[#14141420] bg-[#14141405] p-3 text-sm font-medium focus:outline-none text-gray-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full border border-[#141414] p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#141414]" />
              </div>
            </div>
          </div>

          <div className="p-8 border border-[#141414] bg-white space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tighter border-b border-[#14141410] pb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">Email Notifications</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Receive daily summary reports</div>
                </div>
                <div className="w-12 h-6 bg-[#141414] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">Critical Alerts SMS</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Immediate text for critical values</div>
                </div>
                <div className="w-12 h-6 bg-[#141414] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">Dark Mode</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Toggle system theme</div>
                </div>
                <div className="w-12 h-6 bg-[#14141420] rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
