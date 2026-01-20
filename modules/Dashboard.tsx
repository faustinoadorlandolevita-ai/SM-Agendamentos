
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getBusinessInsights } from '../services/gemini';

const Dashboard = () => {
  const { tenant, invoices, appointments, clients, services, setCurrentView } = useApp();
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Dynamic calculations
  const totalRevenue = invoices.reduce((acc, inv) => inv.status === 'paid' ? acc + inv.amount : acc, 0);
  const totalClients = clients.length;
  const apptsToday = appointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.startTime.startsWith(today);
  }).length;
  const ticketMedio = totalRevenue > 0 ? totalRevenue / (invoices.filter(i => i.status === 'paid').length || 1) : 0;

  const stats = [
    { label: 'Receita Realizada', value: `${tenant.currency} ${totalRevenue.toLocaleString()}`, change: '+0', icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Agendamentos Hoje', value: apptsToday.toString(), change: '0', icon: '📅', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Clientes', value: totalClients.toString(), change: '0', icon: '👥', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Ticket Médio', value: `${tenant.currency} ${ticketMedio.toLocaleString()}`, change: '0', icon: '🎫', color: 'bg-amber-50 text-amber-600' },
  ];

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const data = await getBusinessInsights({ 
        revenue: totalRevenue, 
        appointmentsCount: appointments.length, 
        activeClients: totalClients,
        servicesCount: services.length
      });
      setInsights(data);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [clients, appointments, invoices]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Bem-vindo de volta! Aqui está o resumo do seu negócio hoje.</p>
        </div>
        <button 
          onClick={() => setCurrentView('SCHEDULE' as any)}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all"
        >
          <span>+ Novo Agendamento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Performance Semanal</h3>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Seg', total: 4000 },
                { name: 'Ter', total: 3000 },
                { name: 'Qua', total: 2000 },
                { name: 'Qui', total: 2780 },
                { name: 'Sex', total: 1890 },
                { name: 'Sab', total: 2390 },
                { name: 'Dom', total: 3490 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl">✨</div>
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="mr-2">✨</span> Insights de IA
          </h3>
          
          <div className="space-y-6 relative z-10">
            {loadingInsights ? (
              <div className="space-y-4">
                <div className="h-20 bg-slate-800 rounded-2xl animate-pulse"></div>
                <div className="h-20 bg-slate-800 rounded-2xl animate-pulse"></div>
              </div>
            ) : insights.length > 0 ? (
              insights.map((insight, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <p className="font-bold text-indigo-400 text-xs uppercase mb-1">{insight.impact} Impact</p>
                  <p className="font-bold text-white text-sm mb-1">{insight.title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{insight.description}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm italic">Adicione mais dados para receber insights da IA.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
