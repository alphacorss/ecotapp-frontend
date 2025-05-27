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
    type: 'number',
    required: false,
  },
  {
    label: 'Facility Name',
    name: 'name',
    placeholder: 'Enter the facility name',
    type: 'text',
    required: false,
  },
  {
    label: 'Gross Floor Area',
    name: 'grossFloorArea',
    placeholder: 'Enter the gross floor area (e.g., 45000 sq ft)',
    type: 'text',
    required: true,
  },
  {
    label: 'Building Type',
    name: 'buildingType',
    placeholder: 'Select building type',
    type: 'dropdown',
    required: true,
  },
  {
    label: 'Number of Units',
    name: 'totalNumberOfUnits',
    placeholder: 'Enter the number of units',
    type: 'text',
    required: false,
  },
  {
    label: 'Total Floors',
    name: 'totalFloors',
    placeholder: 'Enter the number of floors/storeys',
    type: 'number',
    required: true,
  },
  {
    label: 'Alternative Energy Source',
    name: 'alternativeEnergySource',
    placeholder: 'Select alternative energy source',
    type: 'dropdown',
    required: false,
  },
];

export const addressFormFields = [
  {
    label: 'Address',
    name: 'address',
    placeholder: 'Enter your address',
    type: 'text',
    required: true,
  },
  {
    label: 'Apt/Unit',
    name: 'apt',
    placeholder: 'Enter your apt/unit',
    type: 'number',
    required: true,
  },
  {
    label: 'Street',
    name: 'street',
    placeholder: 'Enter your street',
    type: 'text',
    required: true,
  },
  {
    label: 'Country',
    name: 'country',
    placeholder: 'Select country',
    type: 'text',
    required: true,
  },
  {
    label: 'Province/State',
    name: 'province',
    placeholder: 'Select province/state',
    type: 'text',
    required: true,
  },
  {
    label: 'City',
    name: 'city',
    placeholder: 'Enter your city',
    type: 'text',
    required: true,
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    placeholder: 'Enter your postal code',
    type: 'number',
    required: true,
  },
];

export const buildingTypes = [
  { label: 'Social Housing', value: 'Social Housing' },
  { label: 'High-Rise Multi-Unit Residential Building', value: 'High-Rise Multi-Unit Residential Building' },
  { label: 'Low-Rise Multi-Unit Residential Building', value: 'Low-Rise Multi-Unit Residential Building' },
  { label: 'Mid-Rise Multi-Unit Residential Building', value: 'Mid-Rise Multi-Unit Residential Building' },
  { label: 'Institutional Buildings', value: 'Institutional Buildings' },
  { label: 'Commercial Building', value: 'Commercial Building' },
  { label: 'Industrial Building', value: 'Industrial Building' },
  { label: 'Other', value: 'Other' },
];

export const amenities = [
  'Elevators',
  'Escalators',
  'Parks and Gardens',
  'Underground garage/Parking lots',
  'Swimming pools',
  'Saunas',
  'Gym',
  'Electric vehicle (EV) charging stations',
  'Party Room',
  'Cinema Room',
  'Lounge',
  'Laundry Rooms',
  'Restaurants/Food Services',
  'Computers and IT Rooms',
  'Kitchen and Cafeteria',
  'Laboratory',
  'Shower Facilities',
  'Outdoor Fields and Tracks',
  'Indoor Fields and Tracks',
  'Operating theatres',
  'Medical imaging and diagnostic Rooms',
];

export const certifications = [
  'LEED (Leadership in Energy and Environmental Design)',
  'BOMA BEST (Building Owners and Managers Association)',
  'ENERGY STAR',
  'Passive House Certification',
  'WELL Building Standard',
  'Collaborative for High-Performance Schools (CHPS)',
  'Green Globes',
  'BREEAM (Building Research Establishment Environmental Assessment Method)',
  'ISO 50001 (Energy Management System)',
];

export const alternativeEnergySource = [{ label: 'Backup Generator', value: 'Backup Generator' }];
