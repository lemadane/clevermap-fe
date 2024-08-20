import { API_URL_MAINTENANCE } from '@/common/constants';
import { Province } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

const PROVINCES = 'provinces';

export async function getProvinceList(): Promise<Province[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}?PageNumber=1&PageCount=100`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      id: item.ID,
      name: item.Name,
      latitude: parseFloat(item.Latitude),
      longitude: parseFloat(item.Longitude),
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    } as Province;
  });
}

export async function getProvince(provinceId: string): Promise<Province> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${provinceId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    name: data.Result.Name,
    latitude: parseFloat(data.Result.Latitude),
    longitude: parseFloat(data.Result.Longitude),
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  } as Province;
}

export async function updateProvince(province: Province) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${province.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: province.name,
        Latitude: String(province.latitude) + '°N',
        Longitude: String(province.longitude) + '°E',
        IsActive: province.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function createProvince(province: Province) {
  const response = await fetch(`${API_URL_MAINTENANCE}/${PROVINCES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Name: province.name,
      Latitude: String(province.latitude) + '°N',
      Longitude: String(province.longitude) + '°E',
      IsActive: province.active,
    }),
  });
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
