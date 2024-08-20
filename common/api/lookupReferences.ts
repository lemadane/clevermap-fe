import { MAINTENANCE_PATH, API_URL_MAINTENANCE } from '@/common/constants';
import { LookupReference } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

export async function getLookupReferenceList(): Promise<LookupReference[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${MAINTENANCE_PATH.LOOKUP_REFERENCES}?PageNumber=1&PageCount=1000`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      id: item.ID,
      name: item.Name,
      hardCode: item.HardCode,
      value: item.Value,
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    } as LookupReference;
  });
}

export async function getLookupReference(
  referenceId: string
): Promise<LookupReference> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${MAINTENANCE_PATH.LOOKUP_REFERENCES}/${referenceId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    name: data.Result.Name,
    hardCode: data.Result.HardCode,
    value: data.Result.Value,
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  } as LookupReference;
}

export async function updateReference(reference: LookupReference) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${MAINTENANCE_PATH.LOOKUP_REFERENCES}/${reference.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: reference.name,
        HardCode: reference.hardCode,
        Value: reference.value,
        IsActive: reference.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function createLookupReference(reference: LookupReference) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${MAINTENANCE_PATH.LOOKUP_REFERENCES}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: reference.name,
        HardCode: reference.hardCode,
        Value: reference.value,
        IsActive: reference.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
