import { API_URL_MAINTENANCE } from '../constants';
import { responseErrorCheck } from '../utils';

const USER_GROUPS = 'usergroup';
const PERMISSIONS = 'permissions';

export async function getUserGroupPermissions(
  userGroupId: String,
  offset: number,
  size: number,
  activeOnly?: boolean
): Promise<any> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${USER_GROUPS}/${userGroupId}/${PERMISSIONS}?PageNumber=${offset}&PageCount=${size}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  let out = data.Result.Items.map((item: any) => {
    return {
      id: String(item.ID),
      name: item.Permission.Name,
      active: item.IsActive,
    };
  });
  if (activeOnly) {
    out = out.filter((item: any) => item.active);
  }
  return out;
}
