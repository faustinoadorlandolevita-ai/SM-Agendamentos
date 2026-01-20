
import { AppData } from '../types';

// Mocking Supabase for the demo environment. 
// In a real scenario, this would use @supabase/supabase-js
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: { user: { id: 'demo-user-123' } } }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Simulate an immediate auth state
      callback('SIGNED_IN', { user: { id: 'demo-user-123' } });
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signOut: async () => {}
  }
};

const STORAGE_KEY = 'faustosystem_data';

export const saveUserData = async (userId: string, data: Partial<AppData>) => {
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(data));
};

export const loadUserData = async (userId: string): Promise<AppData | null> => {
  const data = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  if (!data) return null;
  return JSON.parse(data);
};
