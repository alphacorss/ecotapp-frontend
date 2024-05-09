import { Graph, Home2, LogoutCurve, Messages1, Setting2, Trade, UserEdit } from 'iconsax-react';

export const sideNavItems = [
  {
    title: 'Home',
    icon: (color: string) => <Home2 size={20} color={color} />,
    href: '/dashboard/home',
  },
  {
    title: 'User Management',
    icon: (color: string) => <UserEdit size={20} color={color} />,
    href: '/dashboard/users/pseudo-admins',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
  {
    title: 'Analytics',
    icon: (color: string) => <Graph size={20} color={color} />,
    href: '/dashboard/analytics/energy-consumption',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
  {
    title: 'Carbon Trading',
    icon: (color: string) => <Trade size={20} color={color} />,
    href: '/dashboard/carbon-trading',
  },
  {
    title: 'Broadcast & Survey',
    icon: (color: string) => <Messages1 size={20} color={color} />,
    href: '/dashboard/broadcast&survey/broadcast',
  },
];

export const userNav = [
  {
    title: 'Pseudo Admins',
    href: '/dashboard/users/pseudo-admins',
    allowedRoles: ['superadmin'],
  },
  {
    title: 'Organizations',
    href: '/dashboard/users/organizations',
    allowedRoles: ['superadmin', 'psuedoadmin'],
  },
  {
    title: 'Facilities',
    href: '/dashboard/users/facilities?vt=list&sb=facility',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager'],
  },
  {
    title: 'Tenants',
    href: '/dashboard/users/tenants?sb=tenant',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
];

export const broadcastNav = [
  {
    title: 'Broadcast',
    href: '/dashboard/broadcast&survey/broadcast',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
  {
    title: 'Survey',
    href: '/dashboard/broadcast&survey/survey',
    allowedRoles: [
      'superadmin',
      'psuedoadmin',
      'organizationadmin',
      'organizationmanager',
      'facilitymanager',
      'tenant',
    ],
  },
];

export const analyticsNav = [
  {
    title: 'Energy Consumption',
    href: `/dashboard/analytics/energy-consumption?vt=analytics&energy_type=electricity`,
    allowedRoles: [
      'superadmin',
      'psuedoadmin',
      'organizationadmin',
      'organizationmanager',
      'facilitymanager',
      'tenant',
    ],
  },
  {
    title: 'Energy Forecast',
    href: '/dashboard/analytics/energy-forecast',
    allowedRoles: [
      'superadmin',
      'psuedoadmin',
      'organizationadmin',
      'organizationmanager',
      'facilitymanager',
      'tenant',
    ],
  },
  {
    title: 'Regression',
    href: '/dashboard/analytics/regression',
    allowedRoles: [
      'superadmin',
      'psuedoadmin',
      'organizationadmin',
      'organizationmanager',
      'facilitymanager',
      'tenant',
    ],
  },
];

export const bottomNav = [
  {
    title: 'Settings',
    icon: (color: string) => <Setting2 size={20} color={color} />,
    href: '/dashboard/settings',
  },
  {
    title: 'Logout',
    icon: (color: string) => <LogoutCurve size={20} color={color} />,
    href: '/auth/login',
  },
];
