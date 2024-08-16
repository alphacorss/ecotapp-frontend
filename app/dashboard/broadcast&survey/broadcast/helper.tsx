import { high, mid } from '../../home/helpers';

export const sendToArry = [
  {
    label: 'Organization Admins/Managers',
    value: 'organization',
    allowedRoles: [...high, 'organizationadmin'],
  },
  {
    label: 'Facility Managers',
    value: 'facility',
    allowedRoles: [...high, ...mid],
  },
  {
    label: 'Tenants',
    value: 'tenant',
    allowedRoles: [...high, ...mid, 'facilitymanager'],
  },
];

export const tntOptions = [
  {
    label: 'All Tenants',
    value: 'all',
  },
  {
    label: 'Tenants by Organization',
    value: 'organization',
  },
  {
    label: 'Tenants by Facility',
    value: 'facility',
  },
  {
    label: 'Specific Tenants',
    value: 'tenant',
  },
];

export const tntsOptions = (sendTo: string | null | undefined) => {
  if (!sendTo) return [];

  return [
    {
      label: sendTo === 'organization' ? 'All Organization Admins/Managers' : 'All Facility Managers',
      value: 'all',
    },
  ];
};

export const adminsOptions = (sendTo: string | null | undefined) => {
  if (!sendTo) return [];

  return [
    {
      label: sendTo === 'organization' ? 'All Organization Admins/Managers' : 'All Facility Managers',
      value: 'all',
    },
    {
      label: sendTo === 'organization' ? 'Specific Organizations Admins/Manager' : 'Specific Facility Managers',
      value: sendTo === 'organization' ? 'organization' : 'facility',
    },
  ];
};
