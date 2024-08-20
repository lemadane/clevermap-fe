export const API_URL_MAINTENANCE = `${process.env.NEXT_PUBLIC_API_URL}/maintenance`;
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const MAINTENANCE_PATH = Object.freeze({
  LOOKUP_REFERENCES: 'lookup-references',
  PROVINCES: 'provinces',
  CITIES: 'cities',
  MODULES: 'modules',
  USER_GROUPS: 'user-groups',
  USER_PERMISSIONS: 'user-permissions',
  SYSTEM_USERS: 'systemusers',
});

export const URL_PATH = Object.freeze({
  ACCOUNTS: 'accounts',
  LOGIN: 'user/auth/login',
  MODULE_VS_CONTACT_DETAILS: 'module-vs-contact-details',
  MODULE_VS_ADDRESSES: 'module-vs-addresses',
});

export const LOOKUP_REF_IDS = Object.freeze({
  CIVIL_STATUS: '3',
  GENDER: '1',
  PROFESSION: '15',
  CONTACT_TYPES: '2',
  ADDRESS_TYPES: '4',
});

export const CONTACT_DETAILS = Object.freeze({
  LOOKUP_REFERENCE_ID: '2',
  MODULE_ID_FOR_ACCOUNTS: 2,
});

export const WmEmailRegex =
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const WmMobileRegex = /^(?:\+63-?|0)(?:\d{10}|\d{3}-\d{3}-\d{4})$/;
export const WmLandlineRegex = /^([0-9]{2})?([0-9]{7})$/;
export const WmFBProfileRegex =
  /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
export const WmXProfile = /^(https?:\/\/)?(www\.)?x.com\/[a-zA-Z0-9(\.\?)?]/;
export const WmAppleIdRegex =
  /^([a-zA-Z0-9\.\_\-]+)@([a-zA-Z0-9\.\_\-]+)\.([a-zA-Z]{2,5})$/;
