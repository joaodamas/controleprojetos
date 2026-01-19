export const PERMISSIONS = {
  CAN_MANAGE_USERS: ['admin_master'],
  CAN_MANAGE_PROJECTS: ['admin_master', 'project_manager'],
  CAN_VIEW_FINANCIAL_REPORTS: ['admin_master'],
  CAN_CONFIGURE_WORKSPACE: ['admin_master'],
  CAN_VIEW_DASHBOARD: ['admin_master', 'project_manager', 'viewer'],
};

export type Role = 'admin_master' | 'project_manager' | 'viewer';
