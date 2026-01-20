
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SCHEDULE = 'SCHEDULE',
  CLIENTS = 'CLIENTS',
  SERVICES = 'SERVICES',
  STAFF = 'STAFF',
  BILLING = 'BILLING',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export type Language = 'pt' | 'en';

export interface SubscriptionInfo {
  status: 'trial' | 'active' | 'expired';
  trialEndsAt: string;
  autoRenew: boolean;
  enabledFeatures: {
    schedule: boolean;
    billing: boolean;
    services: boolean;
    clients: boolean;
    staff: boolean;
  };
}

export interface TenantConfig {
  name: string;
  logo: string;
  primaryColor: string;
  currency: string;
  timezone: string;
  locale: string;
  language: Language;
  isAdmin: boolean;
  securityKey: string;
  onboardingCompleted: boolean;
  serviceCategories: string[];
  subscription: SubscriptionInfo;
  schedulingRules: {
    maxDailyAppointments: number;
    minAdvanceBookingHours: number;
    minCancellationHours: number;
    allowClientReschedule: boolean;
    reminderLeadTimeHours: number;
  };
  contactTemplates: Record<string, string>;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit?: string;
  totalSpent: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  specialties: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  serviceId: string;
  staffId: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issuedAt: string;
}

export interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface StaffPayment {
  id: string;
  staffId: string;
  amount: number;
  date: string;
  period: string;
}

export interface AppData {
  tenant: TenantConfig;
  clients: Client[];
  staff: Staff[];
  services: Service[];
  appointments: Appointment[];
  invoices: Invoice[];
  attendance: AttendanceRecord[];
  staffPayments: StaffPayment[];
}
