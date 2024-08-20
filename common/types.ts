export interface Entity {
  id?: string;
  active: boolean;
  dateCreated?: string;
  createdBy?: string;
  timestamp?: string;
  userId?: string;
}

export interface AdminEntity extends Entity {
  name: string;
  hardCode: string;
}

export interface LookupReference extends AdminEntity {
  value: string;
}

export interface Lookup extends AdminEntity {
  referenceId?: string;
  value: string;
}

export interface Province extends AdminEntity {
  latitude: number;
  longitude: number;
}

export interface City extends AdminEntity {
  provinceId?: string;
  latitude: number;
  longitude: number;
  areaCode: number;
}

export interface Locality extends AdminEntity {
  cityId?: string;
  latitude: number;
  longitude: number;
  zipCode: number;
}

export interface Module extends AdminEntity {}

export interface UserGroup extends AdminEntity {}

export interface UserPermission extends AdminEntity {}

export interface Account extends Entity {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  suffix: string;
  birthDate: string;
  currentAge?: number;
  address: string;
  gender: {
    id: string;
    name: string;
  };
  civilStatus: {
    id: string;
    name: string;
  };
  profession: {
    id: string;
    name: string;
  };
}

export type LoggedUser = {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  groupId: string;
  groupName: string;
  accessToken: string;
  refreshToken: string;
  permissions?: string[]; //temporary optional
};

export interface SystemUser extends Entity {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  username: string;
  groupId: string;
  groupName: string;
  active: boolean;
}

export type IdAndName = { id: number; name: string };
