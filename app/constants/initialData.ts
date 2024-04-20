import { TAddressForm } from '../components/forms/AddEditAddress';
import { TFacility, TOrg, TUser } from '../types';

export const initialUser: TUser = {
  _id: '',
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: 'tenant',
    active: false,
    lastLogin: '',
    lastActive: '',
    passwordChangedAt: '',
    profilePicture: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    verificationCode: '',
    verificationCodeExpiresAt: '',
  },
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export const initialAddress: TAddressForm = {
  apt: '',
  street: '',
  country: '',
  province: '',
  city: '',
  postalCode: '',
};

export const initialOrg: TOrg = {
  _id: '',
  name: '',
  apt: '',
  street: '',
  city: '',
  country: '',
  province: '',
  postalCode: '',
  faclitiesCount: 0,
  createdAt: '',
  updatedAt: '',
  __v: 0,
};

export const initialFacility: TFacility = {
  _id: '',
  organization: initialOrg,
  siteId: '',
  name: '',
  area: '',
  totalCommonAreas: '',
  buidingFoundation: '',
  totalNumberOfUnits: '',
  backupgenerator: '',
  totalNumberOfMeters: '',
  ...initialAddress,
  Amenities: [],
  Certifications: [],
  __v: 0,
};
