
import React, { useState } from 'react';

const Auth: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('demo@faustosystem.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic is handled by Supabase listener in App.tsx
    // For demo, we just allow submission
    onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-10 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight">FaustoSystem</h1>
          <p className="mt-2 text-indigo-100">Gestão Inteligente para o seu Negócio</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
          >
            Entrar no Sistema
          </button>
          
          <div className="text-center text-slate-500 text-sm">
            <p>Esqueceu sua senha? <a href="#" className="text-indigo-600 font-semibold">Recuperar</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
