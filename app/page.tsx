import Link from 'next/link';
import React from 'react';

import { sideNavItems } from './constants/sideNavData';

const Landing = () => {
  const avaLinks = [
    ...sideNavItems,
    { title: 'Login', href: '/auth/login' },
    { title: 'Forgot Password', href: '/auth/forgot-password' },
    { title: 'Reset Password', href: '/auth/reset-password' },
  ];
  return (
    <div className="flex gap-3 flex-wrap p-5">
      {avaLinks.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.href}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100  rounded-md transition duration-300 ease-in-out w-full text-left cursor-pointer border border-gray-200 p-2 rouded-[var(--rounded-md)] hover:border-gray-300"
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Landing;
