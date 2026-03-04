import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

// ─── Admin check: prefer Custom Claims, fall back to DB flag ───
export const isAdmin = async (user: firebase.User): Promise<boolean> => {
  const idTokenResult = await user.getIdTokenResult();
  if (idTokenResult.claims.admin === true) return true;

  const snap = await firebase.database().ref(`users/${user.uid}/isAdmin`).once('value');
  return snap.val() === true;
};

// Synchronous fallback for contexts where async is not viable
export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const ADMIN_EMAILS = new Set([
    'joaodamasit@gmail.com',
    'joaodamas4@gmail.com',
  ]);
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
};

// ─── Interfaces ───

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  lastLoginAt?: number;
  createdAt?: number;
  metadata?: {
    lastSignInTime?: string;
    creationTime?: string;
  };
}

export interface UserStats {
  uid: string;
  email: string;
  name: string;
  role: 'Administrador' | 'Usuário';
  lastLogin: string;
  projects: number;
  status: 'Ativo' | 'Inativo';
  createdAt?: string;
}

export interface AdminDashboardData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
  avgProjectsPerUser: number;
  loginLast7Days: number;
  newUsersThisMonth: number;
  activityRate: number;
  userActivity: UserStats[];
  activityTrend: Array<{ day: string; logins: number }>;
}

// ─── Helpers ───

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

const timeAgo = (timestamp: number | undefined): string => {
  if (!timestamp) return 'Nunca';

  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  return `${days}d atrás`;
};

const isUserActive = (lastLoginTimestamp: number | undefined): boolean => {
  if (!lastLoginTimestamp) return false;
  return lastLoginTimestamp > Date.now() - FOURTEEN_DAYS_MS;
};

const countUserProjects = async (uid: string, db: firebase.database.Database): Promise<number> => {
  try {
    const userRef = await db.ref(`users/${uid}`).once('value');
    const userData = userRef.val();

    const basePath = userData?.isAdmin ? 'clients' : `tenants/${uid}/clients`;
    const clientsRef = await db.ref(basePath).once('value');
    const clients = clientsRef.val() || {};

    let total = 0;
    Object.values(clients).forEach((client: any) => {
      if (client.projects) total += Object.keys(client.projects).length;
    });
    return total;
  } catch {
    return 0;
  }
};

// ─── Data fetching (admin-only) ───

async function requireAdmin(): Promise<firebase.User> {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) throw new Error('Unauthorized: not logged in');

  const adminStatus = await isAdmin(currentUser);
  if (!adminStatus) throw new Error('Unauthorized: Admin access required');

  return currentUser;
}

export const fetchAllUsers = async (): Promise<UserProfile[]> => {
  await requireAdmin();

  const db = firebase.database();
  const usersRef = await db.ref('users').once('value');
  const usersData = usersRef.val() || {};

  return Object.entries(usersData as Record<string, any>).map(([uid, data]) => ({
    uid,
    email: data.email || '',
    displayName: data.displayName || data.name || '',
    photoURL: data.photoURL || '',
    lastLoginAt: data.lastLoginAt || data.lastLogin,
    createdAt: data.createdAt,
    metadata: data.metadata,
  }));
};

const generateActivityTrend = (users: UserProfile[]): Array<{ day: string; logins: number }> => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  const trend: Array<{ day: string; logins: number }> = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const dayStart = date.getTime();
    const dayEnd = dayStart + 86400000;

    const loginsCount = users.filter(user =>
      user.lastLoginAt && user.lastLoginAt >= dayStart && user.lastLoginAt < dayEnd
    ).length;

    trend.push({ day: days[date.getDay()], logins: loginsCount });
  }

  return trend;
};

export const fetchAdminDashboardData = async (): Promise<AdminDashboardData> => {
  await requireAdmin();

  const db = firebase.database();
  const users = await fetchAllUsers();

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 86400000;
  const thirtyDaysAgo = now - 30 * 86400000;

  const totalUsers = users.length;
  const activeUsers = users.filter(u => isUserActive(u.lastLoginAt)).length;
  const inactiveUsers = totalUsers - activeUsers;
  const adminUsers = users.filter(u => isAdminEmail(u.email)).length;
  const regularUsers = totalUsers - adminUsers;
  const loginLast7Days = users.filter(u => u.lastLoginAt && u.lastLoginAt >= sevenDaysAgo).length;
  const newUsersThisMonth = users.filter(u => u.createdAt && u.createdAt >= thirtyDaysAgo).length;
  const activityRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

  const userActivity: UserStats[] = await Promise.all(
    users.map(async (user) => ({
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
      role: isAdminEmail(user.email) ? 'Administrador' as const : 'Usuário' as const,
      lastLogin: timeAgo(user.lastLoginAt),
      projects: await countUserProjects(user.uid, db),
      status: isUserActive(user.lastLoginAt) ? 'Ativo' as const : 'Inativo' as const,
      createdAt: user.metadata?.creationTime || '',
    }))
  );

  userActivity.sort((a, b) => {
    const aUser = users.find(u => u.uid === a.uid);
    const bUser = users.find(u => u.uid === b.uid);
    return (bUser?.lastLoginAt || 0) - (aUser?.lastLoginAt || 0);
  });

  const totalProjects = userActivity.reduce((sum, u) => sum + u.projects, 0);
  const avgProjectsPerUser = totalUsers > 0 ? totalProjects / totalUsers : 0;

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    adminUsers,
    regularUsers,
    avgProjectsPerUser: Math.round(avgProjectsPerUser * 10) / 10,
    loginLast7Days,
    newUsersThisMonth,
    activityRate: Math.round(activityRate * 10) / 10,
    userActivity,
    activityTrend: generateActivityTrend(users),
  };
};

// ─── Track login ───

export const trackUserLogin = async (user: firebase.User): Promise<void> => {
  const db = firebase.database();
  const userRef = db.ref(`users/${user.uid}`);
  const snapshot = await userRef.once('value');

  const updates: Record<string, unknown> = {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLoginAt: firebase.database.ServerValue.TIMESTAMP,
    lastLogin: firebase.database.ServerValue.TIMESTAMP,
  };

  if (!snapshot.exists()) {
    updates.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }

  if (isAdminEmail(user.email)) {
    updates.isAdmin = true;
  }

  await userRef.update(updates);
};
