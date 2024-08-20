import { API_URL_MAINTENANCE } from '@/common/constants';
import { Locality } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

const CITIES = 'cities';
const LOCALITIES = 'localities';

export async function getLocalityList(cityId: number|string): Promise<Locality[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${CITIES}/${cityId}/${LOCALITIES}?PageNumber=1&PageCount=100`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      id: item.ID,
      cityId: item.CityID,
      name: item.Name,
      latitude: parseFloat(item.Latitude),
      longitude: parseFloat(item.Longitude),
      zipCode: parseInt(item.ZipCode),
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    } as Locality;
  });
}

export async function getLocality(
  cityId: string,
  localityId: string
): Promise<Locality> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${CITIES}/${cityId}/${LOCALITIES}/${localityId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    cityId: data.Result.CityID,
    name: data.Result.Name,
    latitude: parseFloat(data.Result.Latitude),
    longitude: parseFloat(data.Result.Longitude),
    zipCode: parseInt(data.Result.ZipCode),
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  } as Locality;
}

export async function updateLocality(cityId: string, locality: Locality) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${CITIES}/${cityId}/${LOCALITIES}/${locality.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: locality.name,
        Latitude: String(locality.latitude) + '°N',
        Longitude: String(locality.longitude) + '°E',
        ZipCode: String(locality.zipCode),
        IsActive: locality.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function createLocality(cityId: string, locality: Locality) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${CITIES}/${cityId}/${LOCALITIES}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: locality.name,
        Latitude: String(locality.latitude) + '°N',
        Longitude: String(locality.longitude) + '°E',
        ZipCode: String(locality.zipCode),
        IsActive: locality.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
