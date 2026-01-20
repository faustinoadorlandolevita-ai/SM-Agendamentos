
import React, { useState } from 'react';
import { useApp } from '../App';
import { Service } from '../types';

const ServicesModule = () => {
  const { services, setServices, tenant, notify } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', category: 'Geral', price: '', duration: '60' });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const service: Service = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      durationMinutes: Number(formData.duration),
      description: ''
    };
    setServices([...services, service]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Geral', price: '', duration: '60' });
    notify('Serviço cadastrado com sucesso!');
  };

  const initiateDelete = (id: string) => {
    setServiceToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(s => s.id !== serviceToDelete));
      setServiceToDelete(null);
      setIsConfirmOpen(false);
      notify('Serviço removido.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Serviços</h1>
          <p className="text-slate-500">Configure o catálogo de serviços oferecidos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all"
        >
          + Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? services.map((service) => (
          <div key={service.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                  🛠️
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{service.category}</p>
              
              <div className="flex items-center justify-between py-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Duração</p>
                  <p className="font-bold text-slate-900">{service.durationMinutes} min</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-bold">Preço</p>
                  <p className="font-bold text-indigo-600">{tenant.currency} {service.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">Editar</button>
                <button 
                  onClick={() => initiateDelete(service.id)}
                  className="p-2 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center text-slate-400">
            Nenhum serviço cadastrado ainda. Comece adicionando um novo serviço.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Novo Serviço</h2>
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nome do Serviço</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Ex: Corte de Cabelo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Preço ({tenant.currency})</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Duração (min)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Remover Serviço?</h2>
            <p className="text-slate-500 mb-8">Tem certeza que deseja excluir este serviço? Agendamentos existentes podem ser afetados.</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={confirmDelete}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all"
              >
                Sim, Remover Serviço
              </button>
              <button 
                onClick={() => { setIsConfirmOpen(false); setServiceToDelete(null); }}
                className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesModule;
