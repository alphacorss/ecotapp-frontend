import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { TRole, TSurveyData } from '@/app/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = () => {
  return document.cookie
    ? document.cookie
        .split(';')
        .find((c) => c.trim().startsWith('token='))
        ?.split('=')[1]
    : '';
};

export const getRole = (): TRole | undefined => {
  return document.cookie
    ? (document.cookie
        .split(';')
        .find((c) => c.trim().startsWith('role='))
        ?.split('=')[1] as TRole)
    : undefined;
};

export const clearCookies = () => {
  document.cookie
    .split(';')
    .forEach(
      (c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)),
    );
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const isEmpty = (param: any) =>
  param === null ||
  typeof param === 'undefined' ||
  param.length === 0 ||
  param === '' ||
  Object.keys(param).length === 0 ||
  param.trim() === '';

export const currentDate = () => {
  const date = new Date();
  const longDay = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${longDay}, ${month} ${year}`;
};

export const getDateIndexes = () => {
  const date = new Date();
  const year = date.getFullYear();
  const monthIndex = (date.getMonth() + 1).toString().padStart(2, '0');
  const dayIndex = date.getDate().toString().padStart(2, '0');

  return { year, monthIndex, dayIndex };
};

export const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
};

export const cleanDate = (date: string) => {
  return new Date(date).toDateString();
};

export const cleanTime = (time: string) => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hours12 = hours % 12 || 12;
  const amPm = hours < 12 ? 'AM' : 'PM';
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${hours12}:${formattedMinutes} ${amPm}`;

  return formattedTime;
};

export const getTimeAgo = (timestamp: string): string => {
  const currentTimestamp = new Date();
  const providedTimestamp = new Date(timestamp);
  const timeDifferenceMs = currentTimestamp.getTime() - providedTimestamp.getTime();
  const secondsAgo = Math.floor(timeDifferenceMs / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (yearsAgo > 0) {
    return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
  } else if (monthsAgo > 0) {
    return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
  } else if (weeksAgo > 0) {
    return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
  } else if (daysAgo > 0) {
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  } else if (hoursAgo > 0) {
    return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
  } else if (minutesAgo > 0) {
    return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
  } else {
    return 'just now';
  }
};

export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string.slice(1);
}

export const zodInputValidators = {
  noneNull: z.string().min(1, { message: 'This field is required' }),
  twoNumbers: z.string().min(2, { message: 'Please Two numbers required' }),
  code: z.string().min(6, { message: 'Minimum 6 characters' }),
  phone: z.string().min(8, { message: 'Minimum 8 digits' }),
  postalCode: z.string().min(6, { message: 'Minimum 6 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  name: z.string().trim().min(3, { message: 'Minimum 3 characters' }).max(15, { message: 'Maximum 15 characters' }),
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
  dropDown: z.string().min(1, { message: 'Please select an option' }),
  longText: z.string().min(3, { message: 'Minimum 3 characters' }),
  dateRange: z.string().min(1, { message: 'Please select a date range' }),
  optionalDropDown: z.string().optional(),
  message: z.string().min(3, { message: 'Minimum 3 characters' }),
  refreshTime: z.string().min(1, { message: 'Please select an option' }),
};

export const cleanRole = (role: TRole) => {
  if (role === 'pseudoadmin') {
    return "Pseudo Admin's";
  } else if (role === 'organizationadmin') {
    return "Organization Admin's";
  } else if (role === 'organizationmanager') {
    return "Organization Manager's";
  } else if (role === 'facilitymanager') {
    return "Facility Manager's";
  } else {
    return capitalizeFirstLetter(role);
  }
};

export const cleanRoleSingular = (role: TRole) => {
  if (role === 'pseudoadmin') {
    return 'Pseudo Admin';
  } else if (role === 'organizationadmin') {
    return 'Organization Admin';
  } else if (role === 'organizationmanager') {
    return 'Organization Manager';
  } else if (role === 'facilitymanager') {
    return 'Facility Manager';
  } else {
    return capitalizeFirstLetter(role);
  }
};

export const parseDate = (date: string) => {
  let parts = date.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};

export const convertDate = (dateStr: string, convertToClean: boolean) => {
  if (convertToClean) {
    // Convert to "MM-DD-YY" format

    const parsed = parseDate(dateStr);
    const date = new Date(parsed);

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${month}-${day}-${year}`;
  } else {
    // Convert back to original format
    const [month, day, year] = dateStr.split('-');
    const formattedDate = new Date(`20${year}-${month}-${day}`);
    return formattedDate;
  }
};

export const hasUserResponded = (filledBy: {} | undefined) => {
  if (!filledBy) {
    return false;
  }

  let userFilled = false;
  const user = sessionStorage.getItem('@user');
  const userId = user ? JSON.parse(user).user._id : '';

  Object.keys(filledBy).forEach((key) => {
    if (key === userId) {
      userFilled = true;
    }
  });
  return userFilled;
};

export const getUserAnswer = (surveyInfo: TSurveyData | null) => {
  if (!surveyInfo) {
    return [];
  }

  const user = sessionStorage.getItem('@user');
  const userId = user ? JSON.parse(user).user._id : '';

  const usersResponses = surveyInfo?.questions.flatMap((question) => question.responses.map((response) => response));

  const userAnswer = usersResponses?.map((response) => {
    if (response.user === userId) {
      return response.answer;
    }
  });

  return userAnswer;
};

export const setUrlParams = (items: Object) => {
  const params = new URLSearchParams();
  Object.entries(items).forEach(([key, value]) => {
    params.set(key, value);
  });
  window.history.replaceState({}, '', `?${params}`);
};

export const futurePercentage = (next: number, current: number) => {
  return parseInt((((next - current) / current) * 100 ?? 0).toFixed(2));
};

export const baseUrl = `http://ecotapp-app-elb-dev-2089191536.ca-central-1.elb.amazonaws.com:4000/api/v1`;
