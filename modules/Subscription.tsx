
import React from 'react';
import { useApp } from '../App';

const SubscriptionModule = () => {
  const { tenant } = useApp();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Plano e Assinatura</h1>
        <p className="text-slate-500">Sua conta está atualmente no período de teste gratuito. Escolha um plano para continuar crescendo seu negócio com o FaustoSystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900">Básico</h3>
          <p className="text-slate-500 text-sm mb-6">Ideal para profissionais liberais.</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-slate-900">{tenant.currency} 5.000</span>
            <span className="text-slate-400">/mês</span>
          </div>
          <ul className="space-y-4 flex-1 mb-8">
            <li className="flex items-center text-sm text-slate-600">✅ Agenda Completa</li>
            <li className="flex items-center text-sm text-slate-600">✅ Até 100 Clientes</li>
            <li className="flex items-center text-sm text-slate-600">❌ Relatórios Avançados</li>
            <li className="flex items-center text-sm text-slate-600">❌ Multi-usuários</li>
          </ul>
          <button className="w-full py-4 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">Assinar Básico</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Popular</div>
          <h3 className="text-xl font-bold text-white">Profissional</h3>
          <p className="text-slate-400 text-sm mb-6">Para empresas em crescimento.</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-white">{tenant.currency} 12.500</span>
            <span className="text-slate-400">/mês</span>
          </div>
          <ul className="space-y-4 flex-1 mb-8">
            <li className="flex items-center text-sm text-slate-300">✅ Clientes Ilimitados</li>
            <li className="flex items-center text-sm text-slate-300">✅ Relatórios Financeiros</li>
            <li className="flex items-center text-sm text-slate-300">✅ IA Insights Inclusos</li>
            <li className="flex items-center text-sm text-slate-300">✅ Até 5 Funcionários</li>
          </ul>
          <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30">Assinar Pro</button>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900">Corporativo</h3>
          <p className="text-slate-500 text-sm mb-6">Para grandes operações.</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-slate-900">Sob Consulta</span>
          </div>
          <ul className="space-y-4 flex-1 mb-8">
            <li className="flex items-center text-sm text-slate-600">✅ Tudo do Pro</li>
            <li className="flex items-center text-sm text-slate-600">✅ Gestão Multi-filiais</li>
            <li className="flex items-center text-sm text-slate-600">✅ Suporte 24/7 VIP</li>
            <li className="flex items-center text-sm text-slate-600">✅ Personalização de Marca</li>
          </ul>
          <button className="w-full py-4 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">Falar com Consultor</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModule;
