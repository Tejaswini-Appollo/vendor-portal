import { Role } from '@shared/models/shared.model';

export const REGEX_PATTERNS = {
  email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  mobile: '[6789][0-9]{9}',
  decimal: '^\\d{1,2}(.\\d{1,2})?$',
};

export const GLOBAL_SEARCH_DELAY = 1000;

export const LOADER_TIMEOUT = 2000;
export const S_NO_WIDTH = 100;
export const LIST_NO_OF_ROWS_OPTIONS = [5, 10, 15, 20];

export const APP_ROUTES = { defaultHomePage: '/users' };

export enum ROLES {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

export const USER_ROLES = [
  {
    name: Role.superAdmin,
    value: Role.superAdmin,
  },
  {
    name: Role.agent,
    value: Role.agent,
  },
];

export enum PERMISSION_LIST {
  canViewDashboard = 'canViewDashboard',
  canAddUser = 'canAddUser',
  canEditUser = 'canEditUser',
  canDeleteUser = 'canDeleteUser',
  canViewProfileParentName = 'canViewProfileParentName',
}

export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSION_LIST.canViewDashboard,
    PERMISSION_LIST.canAddUser,
    PERMISSION_LIST.canEditUser,
    PERMISSION_LIST.canDeleteUser,
  ],
  [ROLES.AGENT]: [
    PERMISSION_LIST.canViewDashboard,
    PERMISSION_LIST.canAddUser,
    PERMISSION_LIST.canEditUser,
    PERMISSION_LIST.canDeleteUser,
    PERMISSION_LIST.canViewProfileParentName,
  ],
};
