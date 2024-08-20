import { API_URL, CONTACT_DETAILS, URL_PATH } from '../constants';
import { responseErrorCheck } from '../utils';

export const fetchAddressListOf = async (personId: string) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_ADDRESSES}?RecordId=${personId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data.Result.map((item: any) => {
    return {
      id: item.ID,
      label: item.Label,
      value: item.Address,
      latitude: item.Latitude,
      longitude: item.Longitude,
      type: {
        name: item.Type.Name,
        id: item.Type.ID,
      },
      province: {
        name: item.Province.Name,
        id: item.Province.ID,
      },
      city: {
        name: item.City.Name,
        id: item.City.ID,
      },
      locality: {
        name: item.Locality.Name,
        id: item.Locality.ID,
      },
    };
  });
};

export const fetchAddress = async (contactDetailId: string) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_ADDRESSES}/${contactDetailId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    type: {
      name: data.Result.Type.Name,
      id: data.Result.Type.ID,
    },
    province: {
      name: data.Result.Province.Name,
      id: data.Result.Province.ID,
    },
    city: {
      name: data.Result.City.Name,
      id: data.Result.City.ID,
    },
    locality: {
      name: data.Result.Locality.Name,
      id: data.Result.Locality.ID,
    },
    value: data.Result.Address,
    label: data.Result.Label,
  };
};

export const createAddress = async (args: {
  personId: string;
  typeId: number;
  provinceId: number;
  cityId: number;
  localityId: number;
  label: string;
  value: string;
  latitude: number;
  longitude: number;
}) => {
  const response = await fetch(`${API_URL}/${URL_PATH.MODULE_VS_ADDRESSES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ModuleID: CONTACT_DETAILS.MODULE_ID_FOR_ACCOUNTS,
      RecordID: args.personId,
      TypeID: args.typeId,
      ProvinceID: args.provinceId,
      CityID: args.cityId,
      LocalityID: args.localityId,
      Label: args.label,
      Address: args.value,
      Latitude: String(args.latitude),
      Longitude: String(args.longitude),
      IsActive: true,
    }),
  });
  responseErrorCheck(response);
  return await response.json();
};

export const updateAddress = async (
  addressId: string,
  body: {
    personId: string;
    label: string;
    typeId: number;
    provinceId: number;
    cityId: number;
    localityId: number;
    value: string;
    active: boolean;
  }
) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_CONTACT_DETAILS}/${addressId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ModuleID: CONTACT_DETAILS.MODULE_ID_FOR_ACCOUNTS,
        RecordID: body.personId,
        TypeID: body.typeId,
        ProvinceID: body.provinceId,
        CityId: body.cityId,
        LocalityID: body.localityId,
        Label: body.label,
        Value: body.value,
        IsActive: body.active,
      }),
    }
  );
  responseErrorCheck(response);
  return await response.json();
};
