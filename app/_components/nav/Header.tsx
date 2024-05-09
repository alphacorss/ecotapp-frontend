import { motion } from 'framer-motion';
import React from 'react';

import { NotificationDropDown } from '../utils/DropDowns';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import User from '@/app/_context/User';
import useWindowDimensions from '@/app/_hooks/useMediaQuery';
import { TMessages } from '@/app/types';
import { capitalizeFirstLetter, currentDate } from '@/lib/utils';

const Header = () => {
  const { mobileNav, toggleMobileNav, definedGlobalWidth } = React.useContext(Main);
  const { user, cleanRole, role } = React.useContext(User);
  const { myMessages } = React.useContext(Queries);
  const { currentWindowWidth } = useWindowDimensions();

  const notifications: TMessages[] = myMessages?.data?.data?.messages;

  return (
    <header className="h-[80px] flex justify-between items-center w-full px-5 bg-[#fafafa]">
      <div>
        {role === 'tenant' ? (
          <h1 className="text-lg lg:text-2xl tracking-tight font-[600] text-gray-600">
            Welcome back {capitalizeFirstLetter(user?.user?.firstName.toLowerCase() || '')}
          </h1>
        ) : (
          <h1 className="text-lg lg:text-2xl tracking-tight font-[600] text-gray-600">{cleanRole} Dashboard</h1>
        )}
        <p className="text-gray-500 font-[500] text-xs">{currentDate()}</p>
      </div>
      {currentWindowWidth > definedGlobalWidth && (
        <div className="flex justify-center items-center gap-5">
          {role !== 'tenant' && role !== 'superadmin' && <NotificationDropDown notifications={notifications} />}
        </div>
      )}
      {currentWindowWidth < definedGlobalWidth && (
        <div className="relative z-10 content lg:hidden">
          <motion.button
            animate={mobileNav ? 'open' : 'closed'}
            className="flex flex-col justify-center items-center rounded-lg bg-white dark:bg-gray-500 p-2 py-3 gap-[5px] border"
            onClick={() => toggleMobileNav()}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 7 },
              }}
              className="w-5 h-[1px] bg-gray-400 dark:bg-gray-100  block"
            ></motion.span>
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-5 h-[1px] bg-gray-400 dark:bg-gray-100 block"
            ></motion.span>
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -5 },
              }}
              className="w-5 h-[1px] bg-gray-400 dark:bg-gray-100 block"
            ></motion.span>
          </motion.button>
        </div>
      )}
    </header>
  );
};

export default Header;
