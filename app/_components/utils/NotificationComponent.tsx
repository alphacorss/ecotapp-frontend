import Image from 'next/image';
import React from 'react';

import { ModalComponent } from './Modals';
import ToggleSwitch from './ToggleSwitch';
import useNotification from '@/app/_hooks/components/useNotification';
import { TNotification } from '@/app/types';
import { Button } from '@/components/ui/button';
import { getTimeAgo } from '@/lib/utils';

const NotificationComponent = () => {
  const {
    userId,
    notificationData,
    view,
    activeToggle,
    setActiveToggle,
    hasData,
    toggleOptions,
    isLoading,
    nextPage,
    isDisabled,
  } = useNotification();

  return (
    <React.Fragment>
      <div className="mb-7 flex flex-col gap-3 justify-between">
        <h3 className="text-lg font-[700] text-gray-600 pb-2 border-b-[1px] mb-3">Notifications</h3>

        <ToggleSwitch
          option={activeToggle}
          arrayOptions={toggleOptions}
          itemClass="grid place-content-center"
          setActiveToggle={setActiveToggle}
        />
      </div>
      <div className={`h-[200px] overflow-auto ${hasData ? 'h-fit max-h-[400px]' : ''}`}>
        {isLoading && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-xs text-gray-500 font-[500] text-center">Please wait...</p>
          </div>
        )}

        {!hasData && !isLoading && (
          <div className="flex flex-col justify-center items-center">
            <Image src="/pages/notification.svg" width={80} height={80} alt="notification" />
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-gray-600 font-[600] text-lg py-4 text-center -mb-3">No Notification yet</h3>
              <p className="text-xs text-gray-500 font-[500] text-center">You haven’t received any notifications yet</p>
            </div>
          </div>
        )}

        {notificationData?.map((notification, i) => (
          <>
            {notification.type === 'SURVEY' ? (
              <NotificationTrigger view={view} userId={userId} notification={notification} />
            ) : (
              <ModalComponent
                contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
                trigger={
                  <div>
                    <NotificationTrigger view={view} userId={userId} notification={notification} />
                  </div>
                }
                content={<NotificationContent notification={notification} />}
              />
            )}
          </>
        ))}

        {hasData && (
          <Button
            variant="ghost"
            disabled={isDisabled}
            onClick={() => nextPage()}
            className="font-[500] text-sm p-1 px-2 h-auto"
          >
            {isLoading ? 'Please wait...' : 'Load more'}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

export default NotificationComponent;

const NotificationTrigger = ({
  view,
  userId,
  notification,
}: {
  userId?: string;
  view?: (notification: TNotification) => void;
  notification: TNotification;
}) => {
  return (
    <div
      onClick={() => view && notification.type === 'BROADCAST' && view(notification)}
      className="flex flex-col gap-2 py-3 p-2 rounded-tl-[var(--rounded)] rounded-bl-[var(--rounded)] border-l-4 border-[#FCD19A] mb-3 hover:scale-[0.95] transition cursor-pointer break-all"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 font-[500] text-sm flex gap-3 items-center">
          {notification.type === 'SURVEY' ? 'Survey' : 'Broadcast'}
          <span className="text-[10px]">&#9679;</span>
          <span className="text-xs">{getTimeAgo(notification.createdAt)}</span>
        </h3>
        {!notification.viewedBy[userId as string] && notification.type !== 'SURVEY' && (
          <div className="bg-primary-300 size-[10px] rounded-full"></div>
        )}
      </div>
      <h3 className="text-gray-700 font-[600]">{notification.title}</h3>
      <p className="text-gray-500 font-[400] text-[12px] tracking-wide leading-[20px] line-clamp-3">
        {notification.body}
      </p>
    </div>
  );
};

const NotificationContent = ({ notification }: { notification: TNotification }) => {
  if (notification.type === 'SURVEY') return;

  return (
    <div className="flex flex-col gap-2 py-3 p-2 break-all">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 font-[600] text-sm flex gap-3 items-center">
          Broadcast
          <span className="text-[10px]">&#9679;</span>
          <span className="text-xs">{getTimeAgo(notification.createdAt)}</span>
        </h3>
      </div>

      <h3 className="text-gray-800 font-[600]  text-lg">{notification.title}</h3>

      <p className="text-gray-500 font-[400] text-[13px] tracking-wide">{notification.body}</p>
    </div>
  );
};
