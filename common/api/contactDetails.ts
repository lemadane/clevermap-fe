import { API_URL, CONTACT_DETAILS, URL_PATH } from '../constants';
import { responseErrorCheck } from '../utils';

export const fetchContactDetailsOf = async (personId: string) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_CONTACT_DETAILS}?RecordId=${personId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data.Result.map((item: any) => {
    return {
      id: item.ID,
      label: item.Label,
      value: item.Value,
      type: {
        name: item.Type.Name,
        id: item.Type.ID,
      },
    };
  });
};

export const fetchContactDetail = async (contactDetailId: string) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_CONTACT_DETAILS}/${contactDetailId}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: data.Result.ID,
    label: data.Result.Label,
    value: data.Result.Value,
    type: {
      name: data.Result.Type.Name,
      id: data.Result.Type.ID,
    },
  };
};

export const createContactDetail = async (args: {
  personId: string;
  label: string;
  value: string;
  typeId: number;
}) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_CONTACT_DETAILS}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ModuleID: CONTACT_DETAILS.MODULE_ID_FOR_ACCOUNTS,
        TypeID: args.typeId,
        RecordID: args.personId,
        Label: args.label,
        Value: args.value,
        IsActive: true,
      }),
    }
  );
  responseErrorCheck(response);
  return await response.json();
};

export const updateContactDetail = async (
  contactDetailId: string,
  body: {
    personId: string;
    label: string;
    value: string;
    typeId: number;
    active: boolean;
  }
) => {
  const response = await fetch(
    `${API_URL}/${URL_PATH.MODULE_VS_CONTACT_DETAILS}/${contactDetailId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ModuleID: CONTACT_DETAILS.MODULE_ID_FOR_ACCOUNTS,
        RecordID: body.personId,
        TypeID: body.typeId,
        Label: body.label,
        Value: body.value,
        IsActive: body.active,
      }),
    }
  );
  responseErrorCheck(response);
  return await response.json();
};

