import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OrderModule from './components/OrderModule';
import ResultModule from './components/ResultModule';
import WorkflowModule from './components/WorkflowModule';
import CatalogModule from './components/CatalogModule';
import QCModule from './components/QCModule';
import AnalyticsModule from './components/AnalyticsModule';
import NotificationsModule from './components/NotificationsModule';
import SettingsModule from './components/SettingsModule';
import { FlaskConical, Bell, Search, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onLoginClick={() => setIsAuthModalOpen(true)} />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <OrderModule />;
      case 'results': return <ResultModule />;
      case 'workflow': return <WorkflowModule />;
      case 'catalog': return <CatalogModule />;
      case 'qc': return <QCModule />;
      case 'analytics': return <AnalyticsModule />;
      case 'notifications': return <NotificationsModule />;
      case 'settings': return <SettingsModule />;
      default: return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-[60vh] opacity-20"
        >
          <FlaskConical className="w-24 h-24 mb-4" />
          <h2 className="text-4xl font-bold uppercase tracking-tighter">Module Under Development</h2>
          <p className="uppercase tracking-widest font-bold text-sm">Coming soon to LabConnect</p>
        </motion.div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#E4E3E0] text-[#141414] font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-[#141414] bg-white flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input 
                type="text" 
                placeholder="Global Search (Patients, Orders, Tests)..."
                className="w-full bg-transparent border-none p-2 pl-10 focus:outline-none text-sm font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 hover:bg-[#14141405] transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className="p-2 hover:bg-[#14141405] transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-[#14141410]" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold uppercase tracking-tighter">{user?.username}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-50">{user?.role}</div>
              </div>
              <div className="w-8 h-8 bg-[#141414] text-[#E4E3E0] flex items-center justify-center font-bold text-xs">
                {user?.username[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
