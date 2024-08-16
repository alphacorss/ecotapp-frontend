import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

import usePathParams from '../usePathParams';
import { TNotification, TNotificationType } from '@/app/types';
import qry from '@/lib/queries';
import { getRole, getUser } from '@/lib/utils';

const toggleOptions = [
  {
    name: 'ALL',
    label: 'All',
    icon: () => null,
  },
  {
    name: 'BROADCAST',
    label: 'Broadcast',
    icon: () => null,
  },
  {
    name: 'SURVEY',
    label: 'Survey',
    icon: () => null,
  },
];

const useNotification = () => {
  const { defaultEnable } = usePathParams();
  const userId = getUser().user._id;

  const [activeToggle, setActiveToggle] = React.useState<TNotificationType>('ALL');

  const notification = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: qry.getMyNotificationsRq,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPage.data.canNext ? lastPageParam + 1 : undefined;
      return nextPage;
    },
    enabled: defaultEnable && getRole() !== 'superadmin',
  });

  const isLoading = notification.isLoading || notification.isFetching;

  const canNext = notification.hasNextPage;
  const isDisabled = isLoading || !canNext;

  const nextPage = notification.fetchNextPage;

  const arry = notification.data?.pages;

  const notificationData = arry
    ?.flatMap((data) => {
      return data.data.notifications as TNotification[];
    })
    .filter((data) => (activeToggle === 'ALL' ? true : data.type === activeToggle));

  const hasData = notificationData && notificationData?.length > 0;

  const view = async (notificationData: TNotification) => {
    if (notificationData.viewedBy[userId]) {
      return;
    }

    await qry.viewNotificationsRq(notificationData._id);
    notification.refetch();
  };

  return {
    view,
    userId,
    toggleOptions,
    notification,
    activeToggle,
    setActiveToggle,
    isLoading,
    isDisabled,
    nextPage,
    hasData,
    notificationData,
  };
};

export default useNotification;
