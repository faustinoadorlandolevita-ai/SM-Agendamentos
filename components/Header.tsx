
import React from 'react';
import { useApp } from '../App';

const Header = () => {
  const { tenant, handleLogout, user } = useApp();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Pesquisar clientes, serviços..." 
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white sm:text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
            <p className="text-xs text-slate-500 capitalize">{tenant.locale}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Sair"
        >
          🚪
        </button>
      </div>
    </header>
  );
};

export default Header;
