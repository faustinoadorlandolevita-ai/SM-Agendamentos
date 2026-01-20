
import React from 'react';
import { useApp } from '../App';
import { AppView } from '../types';

const Sidebar = () => {
  const { currentView, setCurrentView, tenant } = useApp();

  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: '📊' },
    { id: AppView.SCHEDULE, label: 'Agenda', icon: '📅' },
    { id: AppView.CLIENTS, label: 'Clientes', icon: '👥' },
    { id: AppView.SERVICES, label: 'Serviços', icon: '🛠️' },
    { id: AppView.STAFF, label: 'Equipe', icon: '👷' },
    { id: AppView.BILLING, label: 'Financeiro', icon: '💰' },
    { id: AppView.REPORTS, label: 'Relatórios', icon: '📈' },
    { id: AppView.SETTINGS, label: 'Configurações', icon: '⚙️' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300">
      <div className="p-6 flex items-center space-x-3">
        <img src={tenant.logo} alt="Logo" className="w-10 h-10 rounded-lg" />
        <span className="text-white font-bold text-lg truncate">{tenant.name}</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
              : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <button 
          onClick={() => setCurrentView(AppView.SUBSCRIPTION)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 border border-amber-400/20 hover:border-amber-400/40 transition-all"
        >
          <div className="text-left">
            <p className="text-xs text-amber-500 font-bold uppercase tracking-wider">Assinatura</p>
            <p className="text-sm text-slate-100 font-medium">Plano Trial</p>
          </div>
          <span className="text-xl">⭐</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
