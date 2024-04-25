import Image from 'next/image';
import React from 'react';

import { ModalComponent } from './Modals';
import ToggleSwitch from './ToggleSwitch';
import axios from '../../../lib/middleware';
import Queries from '@/app/_context/Queries';
import { TMessages } from '@/app/types';
import { baseUrl, cn, getTimeAgo } from '@/lib/utils';

const NotificationComponent = ({
  notifications,
  containerClass,
}: {
  notifications: TMessages[];
  containerClass?: string;
}) => {
  const toggleOptions = [
    {
      name: 'All',
      label: 'All',
      icon: () => null,
    },
    {
      name: 'Broadcast',
      label: 'Broadcast',
      icon: () => null,
    },
    {
      name: 'Survey',
      label: 'Survey',
      icon: () => null,
    },
  ];

  const [activeToggle, setActiveToggle] = React.useState('All');
  const { myMessages } = React.useContext(Queries);

  const view = async (notification: TMessages) => {
    if (!notification.isViewed) {
      try {
        const response = await axios.get(`${baseUrl}/business/message/${notification._id}`);
        if (response.status === 200) {
          myMessages.refetch();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="mb-7 flex flex-col gap-3 justify-between">
        <h3 className="text-lg font-[700] text-gray-600 pb-2 border-b-[1px] mb-3">Notifications</h3>
        {notifications?.length !== 0 && (
          <ToggleSwitch
            arrayOptions={toggleOptions}
            option={activeToggle}
            setActiveToggle={setActiveToggle}
            itemClass="grid place-content-center"
          />
        )}
      </div>
      <div className={cn(`h-[200px] overflow-auto`, containerClass)}>
        {notifications?.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <Image src="/notification.svg" width={80} height={80} alt="notification" />
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-gray-600 font-[600] text-lg py-4 text-center -mb-3">No Notification yet</h3>
              <p className="text-xs text-gray-500 font-[500] text-center">You haven’t received any notifications yet</p>
            </div>
          </div>
        )}

        {notifications?.length > 0 &&
          notifications.map((notification, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 py-3 p-2 transition rounded-tl-[var(--rounded)] rounded-bl-[var(--rounded)] border-l-4 border-[#FCD19A] mb-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-gray-500 font-[500] text-sm flex gap-3 items-center">
                  Broadcast
                  <span className="text-[10px]">&#9679;</span>
                  <span className="text-xs">{getTimeAgo(notification.createdAt)}</span>
                </h3>
                {!notification.isViewed && <div className="bg-primary-300 size-[10px] rounded-full"></div>}
              </div>
              <ModalComponent
                contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
                trigger={
                  <h3
                    onClick={() => view(notification)}
                    className="text-gray-700 font-[600] hover:scale-[1.02] transition cursor-pointer"
                  >
                    {notification.subject}
                  </h3>
                }
                content={
                  <div key={index} className="flex flex-col gap-2 py-3 p-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-500 font-[600] text-sm flex gap-3 items-center">
                        Broadcast
                        <span className="text-[10px]">&#9679;</span>
                        <span className="text-xs">{getTimeAgo(notification.createdAt)}</span>
                      </h3>
                    </div>

                    <h3 className="text-gray-800 font-[600]  text-lg">{notification.subject}</h3>

                    <p className="text-gray-500 font-[400] text-[13px] tracking-wide">{notification.content}</p>
                  </div>
                }
              />
              <p className="text-gray-500 font-[400] text-[12px] tracking-wide leading-[20px] line-clamp-3">
                {notification.content}
              </p>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default NotificationComponent;
