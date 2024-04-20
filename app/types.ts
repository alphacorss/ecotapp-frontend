import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';

export type ProvidersProps = {
  children: React.ReactNode;
};

export type TFormUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: TRole;
};

export type TFormUserUpdate = {
  firstName: string;
  lastName: string;
  password: string | null | undefined;
  phone: string;
};

export type TUser = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: TRole;
    active: boolean;
    lastLogin: string;
    lastActive: string;
    passwordChangedAt: string | null;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verificationCode: string;
    verificationCodeExpiresAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TFacilityUser extends TUser {
  facility: TFacility;
}

export type TRole =
  | 'superadmin'
  | 'pseudoadmin'
  | 'organizationadmin'
  | 'organizationmanager'
  | 'facilitymanager'
  | 'tenant';

export type TCountry = {
  name: string;
  code: string;
  timezone: string;
  utc: string;
  mobileCode: string;
};

export type TMutationHandler = UseMutationResult<unknown, Error, any, unknown>;

export type TChart = {
  data: {
    name: string;
    amt: number;
  }[];
  total: {
    period: string;
    value: number;
    percentage: number;
  }[];
};

export interface TUserExtended extends TUser {
  facility: TFacility;
}

export type TFacilityTabs = 'form' | 'amenities' | 'certifications' | 'address';

export type TOrgForm = {
  name: string;
  apt: string;
  country: string;
  city: string;
  street: string;
  province: string;
  postalCode: string;
};

export interface TOrg extends TOrgForm {
  _id: string;
  name: string;
  faclitiesCount: number;
  apt: string;
  country: string;
  city: string;
  street: string;
  province: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TSingleOrg {
  facilities: TFacility[];
  organization: TOrg;
}

export type TComboBoxSelector = {
  label: string;
  value: string;
};

export type TFacility = {
  _id: string;
  siteId: string;
  area: string;
  buidingFoundation: string;
  backupgenerator: string;
  name: string;
  totalCommonAreas: string;
  totalNumberOfUnits: string;
  totalNumberOfMeters: string;
  Amenities: string[];
  Certifications: string[];
  apt: string;
  country: string;
  city: string;
  street: string;
  province: string;
  postalCode: string;
  organization: TOrg;
  __v: number;
};

export type TQuestion = {
  _id: string;
  questionText: string;
  responses?: TResponse[];
};

export type TResponse = {
  _id: string;
  user: string;
  answer: string;
  name: string;
  email: string;
};

export type TResponseTable = {
  question: string;
  emailAddress: string;
  answer: string;
};

export type TFilledBy = {
  _id: string;
};

export type TMessages = {
  _id: string;
  subject: string;
  content: string;
  files: any[];
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TSurveyData = {
  _id: string;
  title: string;
  description: string;
  responseCounts: string;
  from: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: TRole;
    active: boolean;
    lastLogin: string;
    lastActive: string;
    passwordChangedAt: string | null;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verificationCode: string;
    verificationCodeExpiresAt: string;
  };
  questions: {
    _id: string;
    responses: TResponse[];
    questionText: string;
  }[];
  to: string[];
  filledBy: TFilledBy;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
