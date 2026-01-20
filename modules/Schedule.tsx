
import React, { useState } from 'react';
import { useApp } from '../App';
import { Appointment } from '../types';

const Schedule = () => {
  const { appointments, setAppointments, clients, services, staff, notify } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppt, setNewAppt] = useState({ clientId: '', serviceId: '', staffId: '', date: '', time: '' });

  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const appt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: newAppt.clientId,
      serviceId: newAppt.serviceId,
      staffId: newAppt.staffId,
      startTime: `${newAppt.date}T${newAppt.time}:00`,
      endTime: '',
      status: 'scheduled'
    };
    setAppointments([...appointments, appt]);
    setIsModalOpen(false);
    notify('Agendamento realizado!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Agenda</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700"
          >
            + Novo Agendamento
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-250px)]">
        <div className="grid grid-cols-8 border-b border-slate-100 bg-slate-50">
          <div className="p-4 border-r border-slate-100"></div>
          {days.map(day => (
            <div key={day} className="p-4 text-center font-bold text-slate-500 text-sm border-r border-slate-100 last:border-r-0 uppercase">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-8 divide-x divide-slate-100 min-h-full relative">
            <div className="col-span-1 bg-slate-50/50">
              {hours.map(hour => (
                <div key={hour} className="h-24 border-b border-slate-100 px-4 py-2 text-xs font-bold text-slate-400 text-right">
                  {hour}:00
                </div>
              ))}
            </div>
            
            {days.map(day => (
              <div key={day} className="col-span-1 relative">
                {hours.map(hour => (
                  <div key={hour} className="h-24 border-b border-slate-100"></div>
                ))}
                
                {/* Dynamic Appointments could be mapped here based on day calculation */}
                {appointments.filter(a => new Date(a.startTime).getDay() === days.indexOf(day) + 1).map(appt => {
                  const client = clients.find(c => c.id === appt.clientId);
                  const service = services.find(s => s.id === appt.serviceId);
                  const start = new Date(appt.startTime);
                  const top = (start.getHours() - 8) * 96 + (start.getMinutes() / 60) * 96;
                  
                  return (
                    <div 
                      key={appt.id}
                      style={{ top: `${top}px` }}
                      className="absolute left-1 right-1 h-20 bg-indigo-600 rounded-xl p-2 text-white shadow-lg border-l-4 border-indigo-400 z-10 text-xs overflow-hidden"
                    >
                      <p className="font-bold truncate">{client?.name || 'Cliente'}</p>
                      <p className="opacity-80 truncate">{service?.name || 'Serviço'}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6">Agendar Horário</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Cliente</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                  value={newAppt.clientId}
                  onChange={e => setNewAppt({...newAppt, clientId: e.target.value})}
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Serviço</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                  value={newAppt.serviceId}
                  onChange={e => setNewAppt({...newAppt, serviceId: e.target.value})}
                >
                  <option value="">Selecione um serviço</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" className="px-4 py-3 rounded-xl border border-slate-200" onChange={e => setNewAppt({...newAppt, date: e.target.value})} />
                <input required type="time" className="px-4 py-3 rounded-xl border border-slate-200" onChange={e => setNewAppt({...newAppt, time: e.target.value})} />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
