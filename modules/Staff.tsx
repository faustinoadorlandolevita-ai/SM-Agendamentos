
import React, { useState } from 'react';
import { useApp } from '../App';
import { Staff } from '../types';

const StaffModule = () => {
  const { staff, setStaff, tenant, notify } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '' });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const member: Staff = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStaff.name,
      role: newStaff.role,
      email: newStaff.email,
      specialties: []
    };
    setStaff([...staff, member]);
    setIsModalOpen(false);
    setNewStaff({ name: '', role: '', email: '' });
    notify('Profissional adicionado!');
  };

  const initiateDelete = (id: string) => {
    setStaffToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter(s => s.id !== staffToDelete));
      setStaffToDelete(null);
      setIsConfirmOpen(false);
      notify('Profissional removido da equipe.', 'success');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Equipe</h1>
          <p className="text-slate-500">Gerencie os profissionais do seu negócio.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all"
        >
          + Novo Profissional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.length > 0 ? staff.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-indigo-600">
              {member.name.charAt(0)}
            </div>
            <h3 className="font-bold text-slate-900">{member.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{member.role}</p>
            <div className="flex justify-center space-x-2">
              <button className="p-2 text-slate-400 hover:text-indigo-600">📧</button>
              <button onClick={() => initiateDelete(member.id)} className="p-2 text-slate-400 hover:text-red-500">🗑️</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-10 text-center text-slate-400 italic">
            Nenhum profissional cadastrado.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Novo Profissional</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nome</label>
                <input required type="text" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Cargo/Função</label>
                <input required type="text" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold">Salvar</button>
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
            <h2 className="text-xl font-bold text-slate-900 mb-2">Remover Profissional?</h2>
            <p className="text-slate-500 mb-8">Deseja realmente remover este profissional da sua equipe? O histórico de agendamentos será mantido.</p>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={confirmDelete}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all"
              >
                Confirmar Remoção
              </button>
              <button 
                onClick={() => { setIsConfirmOpen(false); setStaffToDelete(null); }}
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

export default StaffModule;
