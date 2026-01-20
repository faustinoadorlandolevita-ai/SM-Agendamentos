
import React, { useState } from 'react';
import { useApp } from '../App';
import { Client } from '../types';

const Clients = () => {
  const { clients, setClients, tenant, notify } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) return;

    const client: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      totalSpent: 0,
    };

    setClients([...clients, client]);
    setNewClient({ name: '', email: '', phone: '' });
    setIsModalOpen(false);
    notify('Cliente adicionado com sucesso!');
  };

  const initiateDelete = (id: string) => {
    setClientToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete));
      setClientToDelete(null);
      setIsConfirmOpen(false);
      notify('Cliente excluído.', 'success');
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500">Gerencie sua base de contatos e histórico.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all"
        >
          + Adicionar Cliente
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou e-mail..." 
            className="w-full max-w-md px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-sm text-slate-400 font-medium">{filteredClients.length} clientes encontrados</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Nome</th>
                <th className="px-8 py-4">Contato</th>
                <th className="px-8 py-4">Total Gasto</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length > 0 ? filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-900">{client.email}</p>
                    <p className="text-xs text-slate-500">{client.phone}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-bold text-slate-900">
                      {tenant.currency} {client.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 mr-4">📝</button>
                    <button onClick={() => initiateDelete(client.id)} className="text-slate-400 hover:text-red-500">🗑️</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-slate-400 italic">Nenhum cliente cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Novo Cliente</h2>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  value={newClient.name}
                  onChange={e => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Nome do cliente"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">E-mail</label>
                <input 
                  required
                  type="email" 
                  value={newClient.email}
                  onChange={e => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone</label>
                <input 
                  type="text" 
                  value={newClient.phone}
                  onChange={e => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="+244 ..."
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                >
                  Salvar
                </button>
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
            <h2 className="text-xl font-bold text-slate-900 mb-2">Confirmar Exclusão</h2>
            <p className="text-slate-500 mb-8">Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={confirmDelete}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all"
              >
                Excluir Permanentemente
              </button>
              <button 
                onClick={() => { setIsConfirmOpen(false); setClientToDelete(null); }}
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

export default Clients;
