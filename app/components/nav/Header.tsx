import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Notification, SearchNormal } from 'iconsax-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '../inputs/InputComponent';
import Main from '@/app/context/Main';
import User from '@/app/context/User';
import useWindowDimensions from '@/app/hooks/useMediaQuery';
import { capitalizeFirstLetter, currentDate, zodInputValidators } from '@/lib/utils';

const searchParam = zodInputValidators.longText;

const searchSchema = z.object({ searchParam });

type SearchSchema = z.infer<typeof searchSchema>;

const Header = () => {
  const { mobileNav, toggleMobileNav, definedGlobalWidth } = React.useContext(Main);
  const { user, cleanRole, role } = React.useContext(User);
  const { currentWindowWidth } = useWindowDimensions();

  const {
    register,
    formState: { errors },
  } = useForm<SearchSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(searchSchema),
  });

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
        <div className="flex justify-center items-center w-[35%] gap-5">
          <InputComponent
            id="search-page"
            name="search-page"
            placeholder="Search here..."
            autoComplete="off"
            register={register}
            error={errors.searchParam?.message}
            className="bg-transparent"
            before={<SearchNormal size={20} color="gray" className="ml-3" />}
          />
          <span className="border-l-[1px] border-gray-200 px-3 py-3">
            <Notification size={20} color="gray" />
          </span>
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
