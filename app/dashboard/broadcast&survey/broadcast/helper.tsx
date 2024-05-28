export const sendToArry = [
  {
    label: 'Organization Admins/Managers',
    value: 'organization',
  },
  {
    label: 'Facility Managers',
    value: 'facility',
  },
  {
    label: 'Tenants',
    value: 'tenant',
  },
];

export const tntOptions = [
  {
    label: 'All Tenants',
    value: 'all',
  },
  {
    label: 'Tenants by Organization',
    value: 'byOrganization',
  },
  {
    label: 'Tenants by Facility',
    value: 'byFacility',
  },
  {
    label: 'Specific Tenants',
    value: 'specific',
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
      value: 'specific',
    },
  ];
};
