
import React from 'react';
import { useApp } from '../App';

const Settings = () => {
  const { tenant, setTenant } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500">Personalize o sistema para as necessidades do seu negócio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Perfil da Empresa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Nome da Empresa</label>
                <input 
                  type="text" 
                  value={tenant.name}
                  onChange={(e) => setTenant({...tenant, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Setor / Categoria</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  {tenant.serviceCategories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Moeda Local</label>
                <input 
                  type="text" 
                  value={tenant.currency}
                  onChange={(e) => setTenant({...tenant, currency: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Fuso Horário</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>{tenant.timezone}</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Regras de Agendamento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Permitir Reagendamento</p>
                  <p className="text-xs text-slate-500">Clientes podem alterar o horário</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Máx. Agendamentos/Dia</label>
                <input 
                  type="number" 
                  value={tenant.schedulingRules.maxDailyAppointments}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Informações Técnicas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Chave de Segurança</span>
                <span className="font-mono text-xs">••••••••••••</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Versão do Sistema</span>
                <span className="font-mono text-xs">v2.4.0-pro</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 text-sm">Status da API</span>
                <span className="flex items-center text-xs text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all font-bold text-sm">
              Gerar Nova API Key
            </button>
          </div>

          <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
            <h3 className="text-xl font-bold text-red-700 mb-2">Zona de Perigo</h3>
            <p className="text-sm text-red-600 mb-6">Ações irreversíveis que afetam permanentemente sua conta.</p>
            <button className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all text-sm">
              Resetar Todos os Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
