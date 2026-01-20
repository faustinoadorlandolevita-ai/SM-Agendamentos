
import React, { useState } from 'react';
import { useApp } from '../App';

const Onboarding = () => {
  const { tenant, setTenant } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    currency: 'AOA',
    category: 'Geral'
  });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      setTenant({
        ...tenant,
        name: formData.name || 'Nova Empresa',
        currency: formData.currency,
        onboardingCompleted: true
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="flex justify-center mb-8">
          <div className={`w-3 h-3 rounded-full mr-2 ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Bem-vindo ao FaustoSystem</h1>
              <p className="text-slate-500 mt-2">Vamos configurar o perfil da sua empresa.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Negócio</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ex: Barberia do Fausto"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Configurações Financeiras</h1>
              <p className="text-slate-500 mt-2">Como você cobra pelos seus serviços?</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Moeda Padrão</label>
              <select 
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="AOA">Kwanza (AOA)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </div>
        )}

        <button 
          onClick={handleNext}
          className="w-full mt-10 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          {step === 1 ? 'Continuar' : 'Finalizar Configuração'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
