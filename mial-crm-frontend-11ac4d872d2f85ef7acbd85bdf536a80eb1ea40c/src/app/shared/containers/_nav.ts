// import { ROLES } from '@shared/constants/constants';
import { NavItems } from '@shared/models/shared.model';

export const navItems: NavItems[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconPath: 'assets/nav-icon/dashboard.svg',
  },
  {
    name: 'Vendor Management',
    url: '/vendor_management',
    iconPath: 'assets/nav-icon/users.svg',
    // roles: [ROLES.SUPER_ADMIN, ROLES.PARK_ADMIN],
  },
  {
    name: 'Purchase Order Management',
    url: '/purchase_order',
    iconPath: 'assets/nav-icon/dashboard.svg',
  },
  {
    name: 'Shipment Functionality',
    url: '/shipping',
    iconPath: 'assets/nav-icon/dashboard.svg',
  },
  {
    name: 'User Management',
    url: '/user',
    iconPath: 'assets/nav-icon/dashboard.svg',
  },
];
