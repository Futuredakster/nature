// Mock API handlers for the prototype
import seedData from './seed.json';
import type { User, Module, Program, Session, AuthResponse, DashboardStats } from '../types';

// In-memory data store (resets on server restart)
let users: User[] = [...seedData.users as User[]];
let modules: Module[] = [...seedData.modules as Module[]];
let programs: Program[] = [...seedData.programs as Program[]];
let sessions: Session[] = [...seedData.sessions as Session[]];

// Mock authentication
export function login(email: string, password: string): AuthResponse | null {
  const user = users.find(u => u.email === email);
  if (!user) return null;

  // Mock password check (in prototype, any password works)
  return {
    token: `mock-token-${user.id}-${Date.now()}`,
    user: {
      ...user,
      password_hash: undefined // Never send password hash to client
    } as User
  };
}

export function verifyToken(token: string): User | null {
  // Mock token verification - extract user ID from token
  const match = token.match(/mock-token-([^-]+)/);
  if (!match) return null;

  const userId = match[1];
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  return {
    ...user,
    password_hash: undefined
  } as User;
}

// Users API
export function getUsers(filters?: {
  role?: string;
  status?: string;
  search?: string;
}) {
  let filtered = [...users];

  if (filters?.role) {
    filtered = filtered.filter(u => u.role === filters.role);
  }

  if (filters?.status) {
    filtered = filtered.filter(u => u.status === filters.status);
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }

  return filtered.map(u => ({ ...u, password_hash: undefined }));
}

export function getUser(id: string): User | null {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  return { ...user, password_hash: undefined } as User;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updates };
  return { ...users[index], password_hash: undefined } as User;
}

// Modules API
export function getModules(filters?: {
  tag?: string;
  status?: string;
  access_level?: string;
  search?: string;
}) {
  let filtered = [...modules];

  if (filters?.tag) {
    filtered = filtered.filter(m => m.tags.includes(filters.tag as any));
  }

  if (filters?.status) {
    filtered = filtered.filter(m => m.status === filters.status);
  }

  if (filters?.access_level) {
    filtered = filtered.filter(m => m.access_level === filters.access_level);
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(m =>
      m.title.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search)
    );
  }

  return filtered;
}

export function getModule(id: string): Module | null {
  return modules.find(m => m.id === id) || null;
}

export function createModule(module: Omit<Module, 'id' | 'created_at' | 'updated_at'>): Module {
  const newModule: Module = {
    ...module,
    id: `m${modules.length + 1}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  modules.push(newModule);
  return newModule;
}

export function updateModule(id: string, updates: Partial<Module>): Module | null {
  const index = modules.findIndex(m => m.id === id);
  if (index === -1) return null;

  modules[index] = {
    ...modules[index],
    ...updates,
    updated_at: new Date().toISOString()
  };

  return modules[index];
}

export function publishModule(id: string): Module | null {
  return updateModule(id, { status: 'published' });
}

// Programs API
export function getPrograms(filters?: { type?: string }) {
  let filtered = [...programs];

  if (filters?.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }

  return filtered;
}

export function getProgram(id: string): Program | null {
  return programs.find(p => p.id === id) || null;
}

export function createProgram(program: Omit<Program, 'id' | 'created_at'>): Program {
  const newProgram: Program = {
    ...program,
    id: `p${programs.length + 1}`,
    created_at: new Date().toISOString()
  };

  programs.push(newProgram);
  return newProgram;
}

export function updateProgram(id: string, updates: Partial<Program>): Program | null {
  const index = programs.findIndex(p => p.id === id);
  if (index === -1) return null;

  programs[index] = { ...programs[index], ...updates };
  return programs[index];
}

// Sessions API
export function getSessions(filters?: { program_id?: string; upcoming?: boolean }) {
  let filtered = [...sessions];

  if (filters?.program_id) {
    filtered = filtered.filter(s => s.program_id === filters.program_id);
  }

  if (filters?.upcoming) {
    const now = new Date().toISOString();
    filtered = filtered.filter(s => s.start_time > now);
  }

  return filtered.sort((a, b) => a.start_time.localeCompare(b.start_time));
}

export function getSession(id: string): Session | null {
  return sessions.find(s => s.id === id) || null;
}

export function createSession(session: Omit<Session, 'id' | 'created_at'>): Session {
  const newSession: Session = {
    ...session,
    id: `s${sessions.length + 1}`,
    created_at: new Date().toISOString()
  };

  sessions.push(newSession);
  return newSession;
}

export function updateSession(id: string, updates: Partial<Session>): Session | null {
  const index = sessions.findIndex(s => s.id === id);
  if (index === -1) return null;

  sessions[index] = { ...sessions[index], ...updates };
  return sessions[index];
}

// Analytics API
export function getDashboardStats(): DashboardStats {
  return {
    ...seedData.dashboardStats,
    totalModules: modules.length,
    activeCoaches: users.filter(u => u.role === 'coach' || u.role === 'facilitator').length,
    upcomingSessions: getSessions({ upcoming: true }).length
  };
}

// Permission checks
export function canAccessModules(user: User, module: Module): boolean {
  if (user.role === 'superadmin' || user.role === 'admin') return true;
  if (module.access_level === 'public') return true;
  if (module.access_level === 'facilitators' && (user.role === 'facilitator' || user.role === 'coach')) return true;
  return false;
}

export function canUploadModule(user: User): boolean {
  return ['superadmin', 'admin', 'facilitator'].includes(user.role);
}

export function canPublishModule(user: User): boolean {
  return ['superadmin', 'admin'].includes(user.role);
}

export function canManageUsers(user: User): boolean {
  return ['superadmin', 'admin'].includes(user.role);
}
