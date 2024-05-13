import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext } from 'react';

import useSessionStorage from '../_hooks/useSessionStorage';
import { TRole, TUser } from '../types';
import { baseUrl, getRole, getToken } from '@/lib/utils';

export type TUserCtx = {
  userQuery: UseQueryResult<any, Error>;
  user: TUser | undefined;
  role: TRole | undefined;
  cleanRole: string;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
};

const User = createContext<TUserCtx>({
  userQuery: {} as UseQueryResult<any, Error>,
  user: undefined,
  role: undefined,
  cleanRole: '',
  isError: false,
  isLoading: false,
  isFetching: false,
});

export function UserCtxProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const path = usePathname();
  const role = getRole();
  const token = getToken();
  const [user, setUser] = useSessionStorage('@user', {});
  const [cleanRole, setCleanRole] = React.useState('');

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/profile/get${role}`);
      return response.data.data.user;
    },
    enabled: !path.includes('auth'),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: user,
  });

  React.useEffect(() => {
    if (!userQuery.isSuccess && path.includes('/dashboard')) {
      router.replace('/auth/login');
      return;
    }

    setUser(userQuery.data);
    switch (userQuery.data?.user?.role[0]) {
      case 'superadmin':
        setCleanRole('Super Admin');
        break;
      case 'psuedoadmin':
        setCleanRole('Pseudo Admin');
        break;
      case 'organizationadmin':
        setCleanRole('Organization Admin');
        break;
      case 'organizationmanager':
        setCleanRole('Organization Manager');
        break;
      case 'facilitymanager':
        setCleanRole('Facility Manager');
        break;
      case 'tenant':
        setCleanRole('Tenant');
        break;
      default:
        setCleanRole('');
        break;
    }
  }, [path, router, setUser, token, user, userQuery]);

  const contextValue: TUserCtx = {
    userQuery,
    user: userQuery.data,
    role,
    cleanRole,
    isError: userQuery.isError,
    isLoading: userQuery.isLoading,
    isFetching: userQuery.isFetching,
  };

  return <User.Provider value={contextValue}>{children}</User.Provider>;
}

export default User;
