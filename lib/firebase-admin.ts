import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Admin check helper
export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const ADMIN_EMAILS = new Set([
    'joaodamasit@gmail.com',
    'joaodamas4@gmail.com'
  ]);
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
};

// Interface definitions
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

// Helper to calculate time ago
const timeAgo = (timestamp: number | undefined): string => {
  if (!timestamp) return 'Nunca';
  
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes}min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  return `${days}d atrás`;
};

// Helper to determine if user is active (logged in last 14 days)
const isUserActive = (lastLoginTimestamp: number | undefined): boolean => {
  if (!lastLoginTimestamp) return false;
  const fourteenDaysAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
  return lastLoginTimestamp > fourteenDaysAgo;
};

// Helper to count user's projects
const countUserProjects = async (uid: string, db: firebase.database.Database): Promise<number> => {
  try {
    // Check if user is admin
    const userRef = await db.ref(`users/${uid}`).once('value');
    const userData = userRef.val();
    
    if (userData?.isAdmin) {
      // For admin, count all projects in clients path
      const clientsRef = await db.ref('clients').once('value');
      const clients = clientsRef.val() || {};
      
      let totalProjects = 0;
      Object.values(clients).forEach((client: any) => {
        if (client.projects) {
          totalProjects += Object.keys(client.projects).length;
        }
      });
      return totalProjects;
    } else {
      // For regular users, count projects in their tenant path
      const tenantRef = await db.ref(`tenants/${uid}/clients`).once('value');
      const clients = tenantRef.val() || {};
      
      let totalProjects = 0;
      Object.values(clients).forEach((client: any) => {
        if (client.projects) {
          totalProjects += Object.keys(client.projects).length;
        }
      });
      return totalProjects;
    }
  } catch (error) {
    console.error('Error counting projects:', error);
    return 0;
  }
};

// Fetch all authenticated users data
export const fetchAllUsers = async (): Promise<UserProfile[]> => {
  const auth = firebase.auth();
  const currentUser = auth.currentUser;
  
  if (!currentUser || !isAdminEmail(currentUser.email)) {
    throw new Error('Unauthorized: Admin access required');
  }

  // Note: Firebase Auth doesn't provide a direct way to list all users from client-side
  // This would typically need to be done via Firebase Admin SDK on the backend
  // For now, we'll fetch from a users collection in the database
  
  const db = firebase.database();
  const usersRef = await db.ref('users').once('value');
  const usersData = usersRef.val() || {};
  
  const users: UserProfile[] = [];
  
  for (const [uid, userData] of Object.entries(usersData as Record<string, any>)) {
    users.push({
      uid,
      email: userData.email || '',
      displayName: userData.displayName || userData.name || '',
      photoURL: userData.photoURL || '',
      lastLoginAt: userData.lastLoginAt || userData.lastLogin,
      createdAt: userData.createdAt,
      metadata: userData.metadata
    });
  }
  
  return users;
};

// Generate activity trend for the last 7 days
const generateActivityTrend = (users: UserProfile[]): Array<{ day: string; logins: number }> => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  const trend: Array<{ day: string; logins: number }> = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const dayStart = date.getTime();
    const dayEnd = dayStart + (24 * 60 * 60 * 1000);
    
    const loginsCount = users.filter(user => {
      const lastLogin = user.lastLoginAt;
      return lastLogin && lastLogin >= dayStart && lastLogin < dayEnd;
    }).length;
    
    trend.push({
      day: days[date.getDay()],
      logins: loginsCount
    });
  }
  
  return trend;
};

// Main function to fetch admin dashboard data
export const fetchAdminDashboardData = async (): Promise<AdminDashboardData> => {
  const auth = firebase.auth();
  const db = firebase.database();
  const currentUser = auth.currentUser;
  
  if (!currentUser || !isAdminEmail(currentUser.email)) {
    throw new Error('Unauthorized: Admin access required');
  }

  try {
    // Fetch all users
    const users = await fetchAllUsers();
    
    // Calculate metrics
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    
    const totalUsers = users.length;
    const activeUsers = users.filter(user => isUserActive(user.lastLoginAt)).length;
    const inactiveUsers = totalUsers - activeUsers;
    const adminUsers = users.filter(user => isAdminEmail(user.email)).length;
    const regularUsers = totalUsers - adminUsers;
    const loginLast7Days = users.filter(user => 
      user.lastLoginAt && user.lastLoginAt >= sevenDaysAgo
    ).length;
    const newUsersThisMonth = users.filter(user => 
      user.createdAt && user.createdAt >= thirtyDaysAgo
    ).length;
    const activityRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;
    
    // Fetch project counts for each user
    const userActivity: UserStats[] = await Promise.all(
      users.map(async (user) => {
        const projectCount = await countUserProjects(user.uid, db);
        
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          role: isAdminEmail(user.email) ? 'Administrador' : 'Usuário',
          lastLogin: timeAgo(user.lastLoginAt),
          projects: projectCount,
          status: isUserActive(user.lastLoginAt) ? 'Ativo' : 'Inativo',
          createdAt: user.metadata?.creationTime || ''
        };
      })
    );
    
    // Sort by last login (most recent first)
    userActivity.sort((a, b) => {
      const aUser = users.find(u => u.uid === a.uid);
      const bUser = users.find(u => u.uid === b.uid);
      return (bUser?.lastLoginAt || 0) - (aUser?.lastLoginAt || 0);
    });
    
    // Calculate average projects per user
    const totalProjects = userActivity.reduce((sum, user) => sum + user.projects, 0);
    const avgProjectsPerUser = totalUsers > 0 ? totalProjects / totalUsers : 0;
    
    // Generate activity trend
    const activityTrend = generateActivityTrend(users);
    
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
      activityTrend
    };
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    throw error;
  }
};

// Helper to track user login in database
export const trackUserLogin = async (user: firebase.User): Promise<void> => {
  const db = firebase.database();
  const updates: any = {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLoginAt: firebase.database.ServerValue.TIMESTAMP,
    lastLogin: firebase.database.ServerValue.TIMESTAMP
  };
  
  // Only set createdAt if it doesn't exist
  const userRef = db.ref(`users/${user.uid}`);
  const snapshot = await userRef.once('value');
  
  if (!snapshot.exists()) {
    updates.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }
  
  if (isAdminEmail(user.email)) {
    updates.isAdmin = true;
  }
  
  await userRef.update(updates);
};
