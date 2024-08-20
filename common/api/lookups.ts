import { API_URL_MAINTENANCE } from '@/common/constants';
import { Lookup } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

const LOOKUP_REFERENCES = 'lookup-references';
const LOOKUPS = 'lookups';

export async function getLookupList(referenceId: string): Promise<Lookup[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${LOOKUP_REFERENCES}/${referenceId}/${LOOKUPS}?PageNumber=1&PageCount=100`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      referenceId: item.ReferenceID,
      id: item.ID,
      name: item.Name,
      hardCode: item.HardCode,
      value: item.Value,
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    } as Lookup;
  });
}

export async function getLookup(
  referenceId: string,
  lookupId: string
): Promise<Lookup> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${LOOKUP_REFERENCES}/${referenceId}/${LOOKUPS}/${lookupId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    referenceId: data.Result.ReferenceID,
    id: data.Result.ID,
    name: data.Result.Name,
    hardCode: data.Result.HardCode,
    value: data.Result.Value,
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  } as Lookup;
}

export async function updateLookup(referenceId: string, lookup: Lookup) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/lookup-references/${referenceId}/${LOOKUPS}/${lookup.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: lookup.name,
        HardCode: lookup.hardCode,
        Value: lookup.value,
        IsActive: lookup.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function createLookup(referenceId: string, lookup: Lookup) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${'lookup-references'}/${referenceId}/${LOOKUPS}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: lookup.name,
        HardCode: lookup.hardCode,
        Value: lookup.value,
        IsActive: lookup.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
