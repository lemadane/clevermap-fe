import { MAINTENANCE_PATH, API_URL_MAINTENANCE } from '@/common/constants';
import { responseErrorCheck } from '../utils';
import { SystemUser } from '@/common/types';

export async function getSystemUser(id: String): Promise<SystemUser> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${MAINTENANCE_PATH.SYSTEM_USERS}/${id}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: String(data.Result.ID),
    firstName: data.Result.FirstName,
    middleName: data.Result.MiddleName,
    lastName: data.Result.LastName,
    username: data.Result.UserName,
    fullName: data.Result.FullName,
    active: data.Result.IsActive,
    groupId: data.Result.UserGroup.ID,
    groupName: data.Result.UserGroup.Name,
  };
}
