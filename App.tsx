
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef
} from "react";

import {
  AppView,
  TenantConfig,
  Language,
  Client,
  Staff,
  Service,
  Invoice,
  Appointment,
  SubscriptionInfo,
  AttendanceRecord,
  StaffPayment,
  AppData
} from "./types";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Onboarding from "./components/Onboarding";

import Dashboard from "./modules/Dashboard";
import Schedule from "./modules/Schedule";
import Clients from "./modules/Clients";
import ServicesModule from "./modules/Services";
import StaffModule from "./modules/Staff";
import BillingModule from "./modules/Billing";
import Reports from "./modules/Reports";
import Settings from "./modules/Settings";
import SubscriptionModule from "./modules/Subscription";

import { supabase, saveUserData, loadUserData } from "./services/supabase";

/* ========================
   CONSTANTES PADRÃO
======================== */

export const DEFAULT_SUBSCRIPTION: SubscriptionInfo = {
  status: "trial",
  trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  autoRenew: false,
  enabledFeatures: {
    schedule: true,
    billing: true,
    services: true,
    clients: true,
    staff: true
  }
};

export const DEFAULT_TENANT: TenantConfig = {
  name: "Empresa não configurada",
  logo: "https://picsum.photos/seed/fausto/100/100",
  primaryColor: "#4f46e5",
  currency: "AOA",
  timezone: "Africa/Luanda",
  locale: "pt-AO",
  language: "pt",
  isAdmin: true,
  securityKey: "Fausto142902#",
  onboardingCompleted: false,
  serviceCategories: ["Geral", "Limpeza", "Manutenção", "Reparação"],
  subscription: DEFAULT_SUBSCRIPTION,
  schedulingRules: {
    maxDailyAppointments: 50,
    minAdvanceBookingHours: 1,
    minCancellationHours: 12,
    allowClientReschedule: true,
    reminderLeadTimeHours: 24
  },
  contactTemplates: {}
};

/* ========================
   CONTEXTO GLOBAL
======================== */

interface AppContextType {
  tenant: TenantConfig;
  setTenant: React.Dispatch<React.SetStateAction<TenantConfig>>;
  currentView: AppView;
  setCurrentView: (v: AppView) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  staffPayments: StaffPayment[];
  setStaffPayments: React.Dispatch<React.SetStateAction<StaffPayment[]>>;
  notify: (msg: string, type?: "success" | "error") => void;
  user: any;
  handleLogout: () => void;
  hasAccess: () => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};

/* ========================
   COMPONENTE PRINCIPAL
======================== */

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tenant, setTenant] = useState<TenantConfig>(DEFAULT_TENANT);

  const [clients, setClients] = useState<Client[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [staffPayments, setStaffPayments] = useState<StaffPayment[]>([]);

  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [language, setLanguage] = useState<Language>("pt");
  const lastSyncRef = useRef<string>("");

  /* ========================
     AUTENTICAÇÃO
  ======================== */

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  /* ========================
     SINCRONIZAÇÃO
  ======================== */

  useEffect(() => {
    if (!user) return;

    loadUserData(user.id).then(data => {
      if (!data) return;
      const snapshot = JSON.stringify(data);
      lastSyncRef.current = snapshot;

      setTenant(data.tenant || DEFAULT_TENANT);
      setClients(data.clients || []);
      setStaff(data.staff || []);
      setServices(data.services || []);
      setAppointments(data.appointments || []);
      setInvoices(data.invoices || []);
      setAttendance(data.attendance || []);
      setStaffPayments(data.staffPayments || []);
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const payload: AppData = { tenant, clients, staff, services, appointments, invoices, attendance, staffPayments };
    const serialized = JSON.stringify(payload);

    if (serialized !== lastSyncRef.current) {
      lastSyncRef.current = serialized;
      saveUserData(user.id, payload);
    }
  }, [tenant, clients, staff, services, appointments, invoices, attendance, staffPayments, user]);

  const notify = (msg: string, type: "success" | "error" = "success") => {
    // Basic alert for now, could be a toast system
    alert(`${type.toUpperCase()}: ${msg}`);
  };

  const hasAccess = () => {
    const sub = tenant.subscription;
    if (sub.status === "trial" && new Date(sub.trialEndsAt) > new Date()) return true;
    if (sub.status === "active") return true;
    return false;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTenant(DEFAULT_TENANT);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <div className="animate-pulse text-2xl font-bold tracking-widest">FAUSTOSYSTEM</div>
    </div>
  );

  if (!user) return <Auth onSuccess={() => {}} />;
  if (!tenant.onboardingCompleted) return (
    <AppContext.Provider value={{
        tenant, setTenant, currentView, setCurrentView, language, setLanguage,
        clients, setClients, staff, setStaff, services, setServices,
        appointments, setAppointments, invoices, setInvoices,
        attendance, setAttendance, staffPayments, setStaffPayments,
        notify, user, handleLogout, hasAccess
      }}>
      <Onboarding />
    </AppContext.Provider>
  );

  return (
    <AppContext.Provider
      value={{
        tenant, setTenant, currentView, setCurrentView, language, setLanguage,
        clients, setClients, staff, setStaff, services, setServices,
        appointments, setAppointments, invoices, setInvoices,
        attendance, setAttendance, staffPayments, setStaffPayments,
        notify, user, handleLogout, hasAccess
      }}
    >
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {currentView === AppView.DASHBOARD && <Dashboard />}
              {currentView === AppView.SCHEDULE && <Schedule />}
              {currentView === AppView.CLIENTS && <Clients />}
              {currentView === AppView.SERVICES && <ServicesModule />}
              {currentView === AppView.STAFF && <StaffModule />}
              {currentView === AppView.BILLING && <BillingModule />}
              {currentView === AppView.REPORTS && <Reports />}
              {currentView === AppView.SETTINGS && <Settings />}
              {currentView === AppView.SUBSCRIPTION && <SubscriptionModule />}
            </div>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
