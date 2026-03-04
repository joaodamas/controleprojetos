export type Role = 'admin_master' | 'project_manager' | 'viewer';

export type Permission =
  | 'CAN_MANAGE_USERS'
  | 'CAN_MANAGE_PROJECTS'
  | 'CAN_VIEW_FINANCIAL_REPORTS'
  | 'CAN_CONFIGURE_WORKSPACE'
  | 'CAN_VIEW_DASHBOARD'
  | 'CAN_MANAGE_ACTIVITIES'
  | 'CAN_VIEW_AUDIT_LOGS'
  | 'CAN_EXPORT_DATA';

export const PERMISSIONS: Record<Permission, Role[]> = {
  CAN_MANAGE_USERS: ['admin_master'],
  CAN_MANAGE_PROJECTS: ['admin_master', 'project_manager'],
  CAN_MANAGE_ACTIVITIES: ['admin_master', 'project_manager'],
  CAN_VIEW_FINANCIAL_REPORTS: ['admin_master'],
  CAN_CONFIGURE_WORKSPACE: ['admin_master'],
  CAN_VIEW_DASHBOARD: ['admin_master', 'project_manager', 'viewer'],
  CAN_VIEW_AUDIT_LOGS: ['admin_master'],
  CAN_EXPORT_DATA: ['admin_master', 'project_manager'],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return PERMISSIONS[permission]?.includes(userRole) ?? false;
}

export function getUserPermissions(role: Role): Permission[] {
  return (Object.entries(PERMISSIONS) as [Permission, Role[]][])
    .filter(([, roles]) => roles.includes(role))
    .map(([perm]) => perm);
}
