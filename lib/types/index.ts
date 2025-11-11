// Core type definitions for the admin prototype

export type UserRole = 'user' | 'coach' | 'facilitator' | 'admin' | 'superadmin';
export type UserStatus = 'active' | 'inactive' | 'invited';
export type ModuleStatus = 'draft' | 'published' | 'archived';
export type AccessLevel = 'admin' | 'facilitators' | 'public';
export type ProgramType = 'one_on_one' | 'workshop' | 'certification';
export type ModuleTag = '1-on-1' | 'team' | 'facilitator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password_hash?: string;
  profile: {
    bio?: string;
    phone?: string;
    certifications?: string[];
  };
  tags: string[];
  status: UserStatus;
  created_at: string;
  last_active_at: string;
}

export interface ModuleFile {
  id: string;
  filename: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  files: ModuleFile[];
  tags: ModuleTag[];
  access_level: AccessLevel;
  author_id: string;
  status: ModuleStatus;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  title: string;
  type: ProgramType;
  description: string;
  modules: string[]; // module IDs
  facilitators: string[]; // user IDs
  enrollment_settings: {
    open: boolean;
    capacity?: number;
  };
  created_at: string;
}

export interface Session {
  id: string;
  program_id: string;
  title: string;
  start_time: string;
  end_time: string;
  facilitator_id: string;
  location: string;
  capacity: number;
  attendees: string[]; // user IDs
  created_at: string;
}

export interface ActivityLog {
  id: string;
  resource_type: 'module' | 'program' | 'user';
  resource_id: string;
  action: string;
  user_id: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  newSignups30Days: number;
  totalModules: number;
  activeCoaches: number;
  upcomingSessions: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
