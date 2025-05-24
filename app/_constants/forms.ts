export const userForm = [
  {
    id: 'firstName',
    name: 'firstName',
    label: 'First Name',
    placeholder: 'John',
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Doe',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'johndoe@email.com',
  },
];

export const passwordForm = [
  {
    id: 'currentPassword',
    name: 'currentPassword',
    label: 'Current Password',
    placeholder: 'Enter your current password',
  },
  {
    id: 'newPassword',
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'Enter your new password',
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Re-enter your new password',
  },
];

export const facilityFormFields = [
  {
    label: 'Site Unique ID',
    name: 'siteId',
    placeholder: 'Enter the site unique id',
    type: 'text',
  },
  {
    label: 'Facility Name',
    name: 'name',
    placeholder: 'Enter the facility name',
    type: 'text',
  },
  {
    label: 'Gross Floor Area',
    name: 'grossFloorArea',
    placeholder: 'Enter the gross floor area (e.g., 45000 sq ft)',
    type: 'text',
  },
  {
    label: 'Building Type',
    name: 'buildingType',
    placeholder: 'Select building type',
    type: 'dropdown',
  },
  {
    label: 'Number of Units',
    name: 'totalNumberOfUnits',
    placeholder: 'Enter the number of units',
    type: 'text',
  },
  {
    label: 'Total Floors',
    name: 'totalFloors',
    placeholder: 'Enter the number of floors/storeys',
    type: 'number',
  },
  {
    label: 'Alternative Energy Source',
    name: 'alternativeEnergySource',
    placeholder: 'Enter alternative energy source (e.g., Solar)',
    type: 'text',
  },
];

export const addressFormFields = [
  {
    label: 'Address',
    name: 'address',
    placeholder: 'Enter your address',
    type: 'text',
  },
  {
    label: 'Apt/Unit',
    name: 'apt',
    placeholder: 'Enter your apt/unit',
    type: 'number',
  },
  {
    label: 'Street',
    name: 'street',
    placeholder: 'Enter your street',
    type: 'text',
  },
  {
    label: 'Country',
    name: 'country',
    placeholder: 'Select country',
    type: 'text',
  },
  {
    label: 'Province/State',
    name: 'province',
    placeholder: 'Select province/state',
    type: 'text',
  },
  {
    label: 'City',
    name: 'city',
    placeholder: 'Enter your city',
    type: 'text',
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    placeholder: 'Enter your postal code',
    type: 'number',
  },
];

export const buildingTypes = [
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Industrial', value: 'Industrial' },
  { label: 'Mixed Use', value: 'Mixed Use' },
  { label: 'Office', value: 'Office' },
  { label: 'Retail', value: 'Retail' },
  { label: 'Institutional', value: 'Institutional' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Educational', value: 'Educational' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Warehouse', value: 'Warehouse' },
  { label: 'Other', value: 'Other' },
];

export const amenities = [
  'Free Wi-Fi',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Restaurant',
  'Spa',
  'Airport Shuttle',
  'Bar',
  'Concierge Service',
  'Laundry Service',
  'Room Service',
  'Business Center',
  'Childcare',
];

export const certifications = [
  'Certified Financial Analyst (CFA)',
  'Certified Management Accountant (CMA)',
  'Certified Information Systems Auditor (CISA)',
  'Certified Information Security Manager (CISM)',
  'AWS Certified Solutions Architect',
  'Cisco Certified Network Associate (CCNA)',
  'Microsoft Certified: Azure Administrator Associate',
  'Google Cloud Professional Cloud Architect',
  'Certified Salesforce Administrator',
  'Certified Human Resources Professional (CHRP)',
];
