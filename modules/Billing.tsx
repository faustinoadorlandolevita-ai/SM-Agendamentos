
import React from 'react';
import { useApp } from '../App';

const BillingModule = () => {
  const { tenant } = useApp();

  const invoices = [
    { id: 'INV-001', client: 'Ana Silva', amount: 15000, date: '2023-11-20', status: 'Pago' },
    { id: 'INV-002', client: 'João Pereira', amount: 25000, date: '2023-11-21', status: 'Pendente' },
    { id: 'INV-003', client: 'Maria Souza', amount: 12000, date: '2023-11-22', status: 'Pago' },
    { id: 'INV-004', client: 'Pedro Santos', amount: 45000, date: '2023-11-23', status: 'Atrasado' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-500">Controle de faturas, pagamentos e recebimentos.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 rounded-xl font-medium border border-slate-200 hover:bg-slate-50 transition-all">Exportar PDF</button>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all">Nova Fatura</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
          <p className="text-emerald-600 text-sm font-bold uppercase">Total Recebido</p>
          <p className="text-2xl font-bold text-emerald-900 mt-1">{tenant.currency} 82.500</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
          <p className="text-amber-600 text-sm font-bold uppercase">Pendente</p>
          <p className="text-2xl font-bold text-amber-900 mt-1">{tenant.currency} 12.000</p>
        </div>
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
          <p className="text-red-600 text-sm font-bold uppercase">Em Atraso</p>
          <p className="text-2xl font-bold text-red-900 mt-1">{tenant.currency} 5.400</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-8 py-4">ID</th>
              <th className="px-8 py-4">Cliente</th>
              <th className="px-8 py-4">Data</th>
              <th className="px-8 py-4">Valor</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 font-mono text-xs font-bold text-slate-400">{inv.id}</td>
                <td className="px-8 py-5 font-bold text-slate-900">{inv.client}</td>
                <td className="px-8 py-5 text-sm text-slate-500">{inv.date}</td>
                <td className="px-8 py-5 font-bold text-slate-900">{tenant.currency} {inv.amount.toLocaleString()}</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    inv.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' :
                    inv.status === 'Pendente' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 rounded-lg hover:bg-slate-100">👁️</button>
                  <button className="p-2 rounded-lg hover:bg-slate-100">📥</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingModule;
