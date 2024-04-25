import { TRole } from '@/app/types';

export const high = ['superadmin', 'psuedoadmin'];
export const mid = ['organizationadmin', 'organizationmanager'];
export const low = ['facilitymanager'];

export const cardsData = [
  {
    title: 'Organizations',
    allowedRoles: ['superadmin', 'psuedoadmin' as TRole],
    queryKey: 'organization',
  },
  {
    title: 'Facilities',
    allowedRoles: ['superadmin', 'psuedoadmin' as TRole, 'organizationadmin', 'organizationmanager'],
    queryKey: 'facility',
  },
  {
    title: 'Tenants',
    allowedRoles: ['superadmin', 'psuedoadmin' as TRole, 'organizationadmin', 'organizationmanager'],
    queryKey: 'tenant',
  },
];

export const facilityCardsData = [
  {
    title: 'Number of Units',
    allowedRoles: ['facilitymanager' as TRole],
    queryKey: 'unit',
  },
  {
    title: 'Total Tenants',
    allowedRoles: ['facilitymanager' as TRole],
    queryKey: 'tenant',
  },
];

export const cleanTypes = (data: { electricity: number; gas: number; heat: number; water: number } | null) => {
  if (!data) return [];

  return [
    {
      name: 'Electricity',
      value: data.electricity,
    },
    {
      name: 'Gas',
      value: data.gas,
    },
    {
      name: 'Heat',
      value: data.heat,
    },
    {
      name: 'Water',
      value: data.water,
    },
  ];
};
