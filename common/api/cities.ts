import { API_URL_MAINTENANCE } from '@/common/constants';
import { City } from '@/common/types';
import { responseErrorCheck } from '@/common/utils';

const PROVINCES = 'provinces';
const CITIES = 'cities';

export async function getCityList(provinceId: string|number): Promise<City[]> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${provinceId}/${CITIES}?PageNumber=1&PageCount=100`
  );
  responseErrorCheck(response);
  const data = await response.json();
  //eslint-disable-next-line
  return data.Result.Items.map((item: any) => {
    return {
      provinceId: item.ProvinceID,
      id: item.ID,
      name: item.Name,
      latitude: parseFloat(item.Latitude),
      longitude: parseFloat(item.Longitude),
      areaCode: parseInt(item.AreaCode),
      timestamp: item.Timestamp,
      dateCreated: item.DateCreated,
      createdBy: item.CreatedBy,
      userId: item.UserID,
      active: item.IsActive,
    } as City;
  });
}

export async function getCity(
  provinceId: string,
  cityId: string
): Promise<City> {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${provinceId}/${CITIES}/${cityId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    provinceId: data.Result.ProvinceID,
    name: data.Result.Name,
    latitude: parseFloat(data.Result.Latitude),
    longitude: parseFloat(data.Result.Longitude),
    areaCode: parseInt(data.Result.AreaCode),
    timestamp: data.Result.Timestamp,
    dateCreated: data.Result.DateCreated,
    createdBy: data.Result.CreatedBy,
    userId: data.Result.UserID,
    active: data.Result.IsActive,
  } as City;
}

export async function updateCity(provinceId: string, city: City) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${provinceId}/${CITIES}/${city.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: city.name,
        Latitude: String(city.latitude) + '°N',
        Longitude: String(city.longitude) + '°E',
        AreaCode: String(city.areaCode),
        IsActive: city.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function createCity(provinceId: string, city: City) {
  const response = await fetch(
    `${API_URL_MAINTENANCE}/${PROVINCES}/${provinceId}/${CITIES}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: city.name,
        Latitude: String(city.latitude) + '°N',
        Longitude: String(city.longitude) + '°E',
        AreaCode: String(city.areaCode),
        IsActive: city.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
