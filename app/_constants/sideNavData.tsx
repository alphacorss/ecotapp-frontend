import { Graph, Home2, LogoutCurve, Messages1, Setting2, UserEdit } from 'iconsax-react';
import Image from 'next/image';

export const sideNavItems = [
  {
    title: 'Home',
    icon: (color: 'white' | 'gray') => <Home2 size={20} color={color} />,
    href: '/dashboard/home',
  },
  {
    title: 'User Management',
    icon: (color: 'white' | 'gray') => <UserEdit size={20} color={color} />,
    href: '/dashboard/users/pseudo-admins',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
  {
    title: 'Analytics',
    icon: (color: 'white' | 'gray') => <Graph size={20} color={color} />,
    href: '/dashboard/analytics/energy-consumption',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilitymanager'],
  },
  {
    title: 'Carbon Trading',
    icon: (color: 'white' | 'gray') => (
      <Image
        alt=""
        width={25}
        height={25}
        src="/icons/carbon-accounting.svg"
        className={`size-[25px] min-w-fit object-contain object-center ${color === 'white' ? 'filter brightness-200' : ''}`}
      />
    ),
    href: '/dashboard/carbon-trading',
  },
  {
    title: 'Broadcast & Survey',
    icon: (color: 'white' | 'gray') => <Messages1 size={20} color={color} />,
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
    icon: (color: 'white' | 'gray') => <Setting2 size={20} color={color} />,
    href: '/dashboard/settings',
  },
  {
    title: 'Logout',
    icon: (color: 'white' | 'gray') => <LogoutCurve size={20} color={color} />,
    href: '/auth/login',
  },
];
