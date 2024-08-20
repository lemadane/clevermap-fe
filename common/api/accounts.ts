import { API_URL, URL_PATH } from '@/common/constants';
import { Account } from '@/common/types';
import { calculateAge, responseErrorCheck } from '@/common/utils';

export async function getAccountList(
  offset: number,
  size: number,
  search?: string
): Promise<Account[]> {
  const doSearch = !!search?.trim() ? `&Search=${search}` : '';
  const response = await fetch(
    `${API_URL}/${URL_PATH.ACCOUNTS}?PageNumber=${offset}&PageCount=${size}${doSearch}`
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data.Result.Items.map((item: any) => {
    return {
      id: String(item.ID),
      firstName: item.FirstName,
      middleName: item.MiddleName,
      lastName: item.LastName,
      suffix: item.Suffix,
      fullName: item.FullName,
      birthDate: item.Birthday,
      currentAge: calculateAge(item.Birthday),
      address: item.Address,
      civilStatus: {
        id: item.CivilStatus.ID,
        name: item.CivilStatus.Name,
      },
      gender: {
        id: item.Gender.ID,
        name: item.Gender.Name,
      },
      profession: {
        id: item.Profession.ID,
        name: item.Profession.Name,
      },
      active: item.IsActive,
    };
  });
}

export async function getAccount(accountId: string): Promise<Account> {
  const response = await fetch(`${API_URL}/${URL_PATH.ACCOUNTS}/${accountId}`);
  responseErrorCheck(response);
  const data = await response.json();
  return {
    id: String(data.Result.ID),
    firstName: data.Result.FirstName,
    middleName: data.Result.MiddleName,
    lastName: data.Result.LastName,
    suffix: data.Result.Suffix,
    fullName: data.Result.FullName,
    birthDate: data.Result.Birthday,
    currentAge: calculateAge(data.Result.Birthday),
    address: data.Result.Address,
    civilStatus: {
      id: data.Result.CivilStatus.ID,
      name: data.Result.CivilStatus.Name,
    },
    gender: {
      id: data.Result.Gender.ID,
      name: data.Result.Gender.Name,
    },
    profession: {
      id: data.Result.Profession.ID,
      name: data.Result.Profession.Name,
    },
    active: data.Result.IsActive,
  };
}

export async function createAccount(account: Account) {
  const response = await fetch(`${API_URL}/${URL_PATH.ACCOUNTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      FirstName: account.firstName,
      MiddleName: account.middleName,
      LastName: account.lastName,
      Suffix: account.suffix,
      Birthday: account.birthDate,
      GenderID: account.gender.id,
      CivilStatusID: account.civilStatus.id,
      ProfessionID: account.profession.id,
      IsActive: account.active,
    }),
  });
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}

export async function updateAccount(account: Account) {
  const response = await fetch(
    `${API_URL}/${URL_PATH.ACCOUNTS}/${account.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: account.firstName,
        MiddleName: account.middleName,
        LastName: account.lastName,
        Suffix: account.suffix,
        Birthday: account.birthDate,
        GenderID: account.gender.id,
        CivilStatusID: account.civilStatus.id,
        ProfessionID: account.profession.id,
        IsActive: account.active,
      }),
    }
  );
  responseErrorCheck(response);
  const data = await response.json();
  return data;
}
