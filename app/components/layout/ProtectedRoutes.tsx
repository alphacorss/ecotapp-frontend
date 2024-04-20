import { usePathname } from 'next/navigation';
import { notFound } from 'next/navigation';
import React from 'react';

import { TRole } from '@/app/types';
import { getRole } from '@/lib/utils';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const role = getRole();
  const path = usePathname();
  React.useEffect(() => {
    if (!role) return;

    if (role === ('tenant' as TRole) && path.includes('/dashboard/broadcast&survey/broadcast')) {
      return notFound();
    }

    if (role === 'tenant' && path.includes('/users')) {
      return notFound();
    }

    if (
      (role === 'organizationadmin' || role === 'organizationmanager') &&
      (path.includes('/pseudo-admins') || path.includes('/organizations'))
    ) {
      return notFound();
    }

    if (path.includes('/pseudo-admins') && role !== 'superadmin') {
      return notFound();
    }
  }, [role, path]);
  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoutes;
