import { UseMutationResult } from '@tanstack/react-query';
import React from 'react';

//providers
export type ProvidersProps = {
  children: React.ReactNode;
};

// role
export type TRole =
  | 'superadmin'
  | 'pseudoadmin'
  | 'organizationadmin'
  | 'organizationmanager'
  | 'facilitymanager'
  | 'tenant';

//user
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

export interface TOrgUser extends TUser {
  organization: TOrg;
}

export interface TFacilityUser extends TUser {
  facility: TFacility;
}

//select
export type TCountry = {
  name: string;
  code: string;
  timezone: string;
  utc: string;
  mobileCode: string;
};

export type TComboBoxSelector = {
  label: string;
  value: string;
};

//mutations
export type TMutationHandler = UseMutationResult<unknown, Error, any, unknown>;

//homepage
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

export type THomeCharts = {
  array_of_energy: number[];
  current_month_energy: number;
  current_month_energy_breakdown: TCurrentMonthEnergyBreakdown;
  percentage_increase_from_last_month: number;
};

export type THomeCards = {
  organizationStat: { totalOrganizations: number; percentageOrganizationChange: number };
  facilityStat: { totalFacilities: number; percentageFacillityChange: number };
  tenantStat: { totalTenants: number; percentageTenantChange: number };
};

export type THomeCardData = {
  total: number;
  percentage: number;
  queryKey: string;
};

export type TCurrentMonthEnergyBreakdown = {
  electricity: number;
  gas: number;
  heat: number;
  water: number;
};

export type TFacilityTabs = 'form' | 'amenities' | 'certifications' | 'address';

//forms
export type TOrgForm = {
  name: string;
  apt: string;
  country: string;
  city: string;
  street: string;
  province: string;
  postalCode: string;
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

//user routes
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

//analytics
export type TAnalyticsConsumption = {
  array_of_energy: number[];
  energy_cost_intensity: TEnergyCostIntensity;
  energy_efficiency: TEnergyEfficiency;
  energy_use_intensity: TEnergyUseIntensity;
  total_energy_consumed: number;
};

export type TEnergyCostIntensity = {
  percentage_increase: number;
  value: number;
};

export type TEnergyEfficiency = {
  percentage_increase: number;
  value: number;
};

export type TEnergyUseIntensity = {
  percentage_increase: number;
  value: number;
};

//realtime
export type TRealTimeData = {
  array_of_energy: number[];
  total_energy_consumed: number;
};

//report
export type TReport = {
  title: string;
  data: TAnalyticsConsumption | TRealTimeData;
  energyType: string;
  orgName?: string;
  facilityName?: string;
  tenantName?: string;
};
