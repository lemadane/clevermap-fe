import { API_URL_MAINTENANCE } from '@/common/constants';
import { AdminEntity } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

export async function getList(entityName: string): Promise<AdminEntity[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${entityName}?PageNumber=1&PageCount=100`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      id: item.ID,
      name: item.Name,
      hardCode: item.HardCode,
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    };
  });
}

export async function getOne(
  entityName: string,
  id: string
): Promise<AdminEntity> {
  const response = await fetch(`${API_URL_MAINTENANCE}/${entityName}/${id}`);
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    name: data.Result.Name,
    hardCode: data.Result.HardCode,
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  };
}

export async function update(entityName: string, entity: AdminEntity) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${entityName}/${entity.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: entity.name,
        HardCode: entity.hardCode,
        IsActive: entity.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function create(entityName: string, entity: AdminEntity) {
  const response = await fetch(`${API_URL_MAINTENANCE}/${entityName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Name: entity.name,
      HardCode: entity.hardCode,
      IsActive: entity.active,
    }),
  });
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
