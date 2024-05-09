'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { CollapsibleSideNav } from './CollapsibleSideNav';
import { analyticsNav, bottomNav, broadcastNav, sideNavItems, userNav } from '@/app/_constants/sideNavData';
import Main from '@/app/_context/Main';
import User from '@/app/_context/User';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import useWindowDimensions from '@/app/_hooks/useMediaQuery';
import { capitalizeFirstLetter, clearCookies, clearSessionStorage } from '@/lib/utils';

const SideNav = () => {
  const currentPath = usePathname();

  const { mobileNav, toggleMobileNav, definedGlobalWidth } = React.useContext(Main);
  const { role, user, cleanRole } = React.useContext(User);

  const { currentWindowWidth } = useWindowDimensions();
  const isMobile = currentWindowWidth < definedGlobalWidth;
  const [expandDrawer, setExpandDrawer] = useLocalStorage('@expandDrawer', true);

  const [isUserOpen, setIsUserOpen] = useLocalStorage('@isSideMenuUserOpen', true);

  const [isBroadCastOpen, setIsBroadcastOpen] = useLocalStorage('@isSideMenuBroadcastOpen', true);

  const [isAnalyticsOpen, setIsAnalyticsOpen] = useLocalStorage('@isSideMenuAnalyticsOpen', true);

  React.useEffect(() => {
    !isMobile && mobileNav && toggleMobileNav();
  }, [mobileNav, toggleMobileNav, isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      setExpandDrawer(true);
    }
  }, [isMobile, setExpandDrawer]);

  const sideNavStyle = {
    minWidth:
      currentWindowWidth < definedGlobalWidth
        ? mobileNav
          ? 'var(--side-nav-width)'
          : '0'
        : expandDrawer
          ? 'var(--side-nav-width)'
          : 80,
    top: 0,
    left: 0,
  };

  const containerStyle = {
    display: isMobile ? (mobileNav ? 'flex' : 'none') : 'flex',
  };

  const itemsStyle = {
    display: isMobile ? (mobileNav ? 'block' : 'none') : 'block',
  };

  return (
    <div
      style={{
        ...sideNavStyle,
        position: isMobile ? 'fixed' : 'relative',
        overflowX:
          currentWindowWidth < definedGlobalWidth
            ? mobileNav
              ? 'visible'
              : 'hidden'
            : expandDrawer
              ? 'visible'
              : 'visible',
      }}
      className={`flex flex-col h-full bg-white transition-all duration-300 ease-in-out group border-r-2 z-[49] hover:border-primary-300/50`}
    >
      {/* toggle sidenav button */}
      {!isMobile && (
        <span
          onClick={() => {
            setExpandDrawer(expandDrawer ? false : true);
            setIsUserOpen(false);
            setIsBroadcastOpen(false);
            setIsAnalyticsOpen(false);
          }}
          className="absolute top-1/2 -right-[12px] transform -translate-y-1/2 group-hover:grid hidden place-content-center border border-gray-300 rounded-full p-1 bg-white cursor-pointer transition group-hover:border-primary-300/50"
        >
          <ChevronRight
            size={18}
            className={`text-gray-400 group-hover:text-primary-300 ${expandDrawer ? 'transform rotate-180' : ''}`}
          />
        </span>
      )}

      <div
        style={containerStyle}
        className={`w-full h-full overflow-auto p-5  flex-col no-scrollbar group-hover:scrollbar transition`}
      >
        <div style={itemsStyle} className={`flex-[8] flex-col gap-4 w-full transition`}>
          {/* top */}
          {user && (
            <div className="flex items-center gap-4 mb-10 w-full">
              <span className="relative w-[40px] h-[40px]">
                <span className="w-full h-full bg-blue-100 text-primary-300 text-[25px] flex justify-center items-center rounded-full">
                  {`${user.user && user.user.firstName[0].toUpperCase()}`}
                </span>

                <div className="w-3 aspect-square rounded-full bg-green-500 absolute bottom-0 right-0" />
              </span>
              {expandDrawer && (
                <div className="whitespace-nowrap">
                  <h3 className="font-semibold">{`${
                    user?.user && capitalizeFirstLetter(user.user.firstName.toLocaleLowerCase())
                  } ${
                    user.user && user.user.firstName.length + user.user.lastName.length < 20
                      ? capitalizeFirstLetter(user.user.lastName.toLowerCase())
                      : ''
                  }`}</h3>
                  <p className="text-gray-500 text-xs tracking-tight font-[500]">{cleanRole}</p>
                </div>
              )}
            </div>
          )}

          {/* sidenav items */}
          <ul className="w-full pb-10">
            {sideNavItems.map((item, index) => {
              if (item.title === 'User Management') {
                if (!item?.allowedRoles?.includes(role as string)) {
                  return null;
                }
                return (
                  <CollapsibleSideNav
                    key={index}
                    item={item}
                    role={role}
                    array={userNav}
                    isOpen={isUserOpen}
                    setIsOpen={setIsUserOpen}
                    expandDrawer={expandDrawer}
                    setExpandDrawer={setExpandDrawer}
                  />
                );
              } else if (item.title === 'Broadcast & Survey') {
                return (
                  <CollapsibleSideNav
                    key={index}
                    role={role}
                    item={item}
                    array={broadcastNav}
                    isOpen={isBroadCastOpen}
                    setIsOpen={setIsBroadcastOpen}
                    expandDrawer={expandDrawer}
                    setExpandDrawer={setExpandDrawer}
                  />
                );
              } else if (item.title === 'Analytics') {
                return (
                  <CollapsibleSideNav
                    key={index}
                    role={role}
                    item={item}
                    array={analyticsNav}
                    isOpen={isAnalyticsOpen}
                    setIsOpen={setIsAnalyticsOpen}
                    expandDrawer={expandDrawer}
                    setExpandDrawer={setExpandDrawer}
                  />
                );
              } else {
                return (
                  <Link
                    key={index}
                    onClick={() => {
                      toggleMobileNav();
                    }}
                    href={item.href}
                    className={`side_nav px-4 py-2  ${expandDrawer ? 'justify-start' : 'justify-center'} ${
                      item.href === currentPath
                        ? 'bg-primary-300 text-white hover:bg-primary-300/90 transition'
                        : 'text-gray-900 hover:border hover:border-primary-300'
                    }`}
                  >
                    <span>{item.icon(item.href === currentPath ? 'white' : 'gray')}</span>
                    {expandDrawer && (
                      <span className={`font-[500] ${item.href === currentPath ? 'text-white' : 'text-gray-500'}`}>
                        {item.title}
                      </span>
                    )}
                  </Link>
                );
              }
            })}
          </ul>
        </div>

        {/* bottom */}
        <div className={`mb-6`} style={itemsStyle}>
          {bottomNav.map((item, index) => {
            if (item.href === '/auth/login') {
              return (
                <a
                  key={index}
                  onClick={() => {
                    toggleMobileNav();
                    clearCookies();
                    clearSessionStorage();
                    window.location.replace(item.href);
                  }}
                  className={`flex gap-3 items-center w-full mb-2 rounded-[var(--rounded)] text-sm h-10 px-4 py-2 whitespace-nowrap border border-white transition cursor-pointer ${
                    expandDrawer ? 'justify-start' : 'justify-center'
                  } ${
                    item.href === currentPath
                      ? 'bg-primary-300 text-white hover:bg-primary-300/90 transition'
                      : 'text-gray-900 hover:border hover:border-primary-300'
                  }`}
                >
                  <span>{item.icon(item.href === currentPath ? 'white' : 'gray')}</span>
                  {expandDrawer && (
                    <span className={`font-[500] ${item.href === currentPath ? 'text-white' : 'text-gray-500'}`}>
                      {item.title}
                    </span>
                  )}
                </a>
              );
            }
            return (
              <Link
                key={index}
                onClick={() => toggleMobileNav()}
                href={item.href}
                className={`flex gap-3 items-center w-full mb-2 rounded-[var(--rounded)] text-sm h-10 px-4 py-2 whitespace-nowrap border border-white transition ${
                  expandDrawer ? 'justify-start' : 'justify-center'
                } ${
                  item.href === currentPath
                    ? 'bg-primary-300 text-white hover:bg-primary-300/90 transition'
                    : 'text-gray-900 hover:border hover:border-primary-300'
                }`}
              >
                <span>{item.icon(item.href === currentPath ? 'white' : 'gray')}</span>
                {expandDrawer && (
                  <span className={`font-[500] ${item.href === currentPath ? 'text-white' : 'text-gray-500'}`}>
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {expandDrawer && (
          <h2 className="text-2xl text-primary-300 font-bold" style={itemsStyle}>
            ecotapp
          </h2>
        )}
      </div>
    </div>
  );
};

export default SideNav;
