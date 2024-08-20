'use client';
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Account, Lookup } from '../types';
import { LOOKUP_REF_IDS } from '../constants';
import { getLookupList } from '../api/lookups';
import { createAccount, getAccount, updateAccount } from '../api/accounts';
import moment from 'moment';
import useToastState from '../store/WmToastState';
import { Column, GridContainer, GridItem, Row } from './WmLayoutModes';

type Props = Readonly<{
  personId?: string;
}>;

const textFieldStyle = { width: '100%' };

export function WmPersonalDetails(props: Props) {
  const toastState = useToastState((state) => state);

  const [virgin, setVirgin] = useState(true);

  const [isNew] = useState(props.personId === 'new' ? true : false);
  const [account, setAccount] = useState<Account>({} as Account);

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);

  const [middleName, setMiddleName] = useState('');
  const [middleNameError, setMiddleNameError] = useState(false);

  const [suffix, setSuffix] = useState('');
  const [suffixError, setSuffixError] = useState(false);

  const [birthDate, setBirthDate] = useState('');
  const [birthdateError, setBirthdateError] = useState(false);

  const [gender, setGender] = useState({
    id: '',
    name: '',
  });
  const [genderError, setGenderError] = useState(false);

  const [civilStatus, setCivilStatus] = useState({
    id: '',
    name: '',
  });
  const [civilStatusError, setCivilStatusError] = useState(false);

  const [profession, setProfession] = useState({
    id: '',
    name: '',
  });
  const [professionError, setProfessionError] = useState(false);

  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(true);

  const [lookups, setLookups] = useState({
    civilStatuses: [] as Lookup[],
    genders: [] as Lookup[],
    professions: [] as Lookup[],
  });

  useEffect(() => {
    (async () => {
      setLookups({
        civilStatuses: await getLookupList(LOOKUP_REF_IDS.CIVIL_STATUS),
        genders: await getLookupList(LOOKUP_REF_IDS.GENDER),
        professions: await getLookupList(LOOKUP_REF_IDS.PROFESSION),
      });
      if (!isNew) {
        const data = await getAccount(props.personId as string);
        setAccount(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMiddleName(data.middleName);
        setSuffix(data.suffix);
        setBirthDate(moment(new Date(data.birthDate)).format('YYYY-MM-DD'));
        setGender(data.gender);
        setCivilStatus(data.civilStatus);
        setProfession(data.profession);
        setActive(data.active);
      }
    })();
    setLoading(false);
  }, [loading, isNew]);

  const validate = () => {
    setVirgin(false);
    if (firstName.trim() === '') {
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);

    if (String(lastName).trim() === '') {
      setLastNameError(true);
      return;
    }
    setLastNameError(false);

    if (middleName.trim() === '') {
      setMiddleNameError(true);
      return;
    }
    setMiddleNameError(false);

    const isFutureDate = new Date(birthDate) > new Date();
    if (isFutureDate) {
      setBirthdateError(true);
      return;
    }
    setBirthdateError(false);

    if (!gender?.id) {
      setGenderError(true);
      return;
    }
    setGenderError(false);

    if (!civilStatus?.id) {
      setCivilStatusError(true);
      return;
    }
    setCivilStatusError(false);

    if (profession && !profession.id) {
      setProfessionError(true);
      return;
    }
    setProfessionError(false);
  };

  return (
    <Column width='98%'>
      <Card
        sx={{
          padding: '20px',
          border: '2px solid #ccc',
          borderRadius: '12px',
          boxShadow:
            '0px 1px 1px rgba(0, 0, 0, 0.08), ' +
            '0px 2px 1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Column
          justifyContent='left'
          spacing={2}
        >
          <Row
            padding='10px 20px 10px 10px'
            justifyContent='left'
            alignItems='center'
          >
            <Typography
              variant='h5'
              fontWeight='bold'
              fontSize={28}
            >
              Personal Details
            </Typography>
          </Row>
          <Column>
            <GridContainer spacing={2}>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <TextField
                  label='First Name'
                  sx={textFieldStyle}
                  value={firstName}
                  onChange={(e) => {
                    e.preventDefault();
                    setFirstName(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    validate();
                  }}
                  error={firstNameError}
                  helperText={firstNameError ? 'First name is required' : ''}
                />
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <TextField
                  label='Last Name'
                  sx={textFieldStyle}
                  value={lastName}
                  onChange={(e) => {
                    e.preventDefault();
                    setLastName(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    validate();
                  }}
                  error={lastNameError}
                  helperText={lastNameError ? 'Last name is required' : ''}
                />
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <TextField
                  label='Middle Name'
                  sx={textFieldStyle}
                  value={middleName}
                  onChange={(e) => {
                    e.preventDefault();
                    setMiddleName(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    validate();
                  }}
                  error={middleNameError}
                  helperText={middleNameError ? 'Middle name is required' : ''}
                />
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <TextField
                  label='Suffix'
                  sx={textFieldStyle}
                  value={suffix}
                  onChange={(e) => {
                    e.preventDefault();
                    setSuffix(e.target.value);
                  }}
                  helperText='(Optional)'
                />
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <TextField
                  id='birthdate'
                  label='Birthdate'
                  type='date'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={textFieldStyle}
                  value={birthDate ? birthDate : '2000-01-01'}
                  onChange={(e) => {
                    e.preventDefault();
                    const bdate = e.target.value;
                    setBirthDate(e.target.value);
                  }}
                  onBlur={(e) => {
                    e.preventDefault();
                    validate();
                  }}
                  error={birthdateError}
                  helperText={birthdateError ? 'Birthdate is invalid' : ''}
                />
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <FormControl
                  error={genderError}
                  fullWidth
                >
                  <InputLabel error={genderError}>Gender</InputLabel>
                  <Select
                    label='Gender'
                    value={gender?.name}
                    onChange={(e) => {
                      e.preventDefault();
                      const name = e.target.value;
                      const [result] = lookups.genders.filter(
                        (item) => item.name === name
                      );
                      setGender(result as { id: string; name: string });
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      validate();
                    }}
                    error={genderError}
                  >
                    {lookups.genders
                      .filter((item) => item.active)
                      .map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText
                    error={genderError}
                    hidden={!genderError}
                  >
                    {genderError ? 'Gender is required' : ''}
                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem
                xs={12}
                md={6}
              >
                <FormControl
                  error={civilStatusError}
                  fullWidth
                >
                  <InputLabel error={civilStatusError}>Civil Status</InputLabel>
                  <Select
                    label='Civil Status'
                    value={civilStatus?.name}
                    onChange={(e) => {
                      e.preventDefault();
                      const [result] = lookups.civilStatuses.filter(
                        (item) => item.name === e.target.value
                      );
                      setCivilStatus(result as { id: string; name: string });
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      validate();
                    }}
                    error={civilStatusError}
                  >
                    {lookups.civilStatuses
                      .filter((item) => item.active)
                      .map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText
                    error={civilStatusError}
                    hidden={!civilStatusError}
                  >
                    {civilStatusError ? 'Civil status is required' : ''}
                  </FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem
                xs={12}
                md={6}
              >
                <FormControl
                  error={professionError}
                  fullWidth
                >
                  <InputLabel error={professionError}>Profession</InputLabel>
                  <Select
                    label='Profession'
                    value={profession?.name}
                    onChange={(e) => {
                      e.preventDefault();
                      const name = e.target.value;
                      const [result] = lookups.professions.filter(
                        (item) => item.name === name
                      );
                      setProfession(result as { id: string; name: string });
                    }}
                    onBlur={(e) => {
                      e.preventDefault();
                      validate();
                    }}
                    error={professionError}
                  >
                    {lookups.professions
                      .filter((item) => item.active)
                      .map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText
                    error={professionError}
                    hidden={!professionError}
                  >
                    {professionError ? 'Profession is required' : ''}
                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem
                xs={12}
                md={6}
                width='100%'
              >
                <FormControlLabel
                  value='start'
                  control={
                    <Switch
                      color='primary'
                      checked={active}
                      onChange={(e) => {
                        e.preventDefault();
                        setActive(e.target.checked);
                      }}
                    />
                  }
                  label='Activated'
                  labelPlacement='start'
                />
              </GridItem>
            </GridContainer>
          </Column>
          <Row justifyContent='right'>
            <Button
              variant='contained'
              sx={{
                paddingX: '2em',
                paddingY: '1em',
              }}
              disabled={
                virgin ||
                firstNameError ||
                lastNameError ||
                middleNameError ||
                birthdateError ||
                genderError ||
                civilStatusError ||
                professionError
              }
              onClick={(e) => {
                e.preventDefault();
                (async () => {
                  try {
                    let result: any;
                    if (isNew) {
                      result = await createAccount({
                        firstName,
                        lastName,
                        middleName,
                        suffix,
                        birthDate: moment(new Date(birthDate)).format(
                          'YYYY-MM-DD'
                        ),
                        gender,
                        civilStatus,
                        profession,
                        active,
                      } as Account);
                    } else {
                      result = await updateAccount({
                        ...account,
                        firstName,
                        lastName,
                        middleName,
                        suffix,
                        birthDate: moment(new Date(birthDate)).format(
                          'YYYY-MM-DD'
                        ),
                        gender,
                        civilStatus,
                        profession,
                        active,
                      } as Account);
                    }
                    toastState.setState({
                      ...toastState,
                      message: result.Message,
                      severity: result.IsSuccess ? 'success' : 'error',
                      visibility: true,
                    });
                  } catch (error: any) {
                    toastState.setState({
                      ...toastState,
                      message: (error as Error).message,
                      severity: 'error',
                      visibility: true,
                    });
                  }
                })();
              }}
            >
              Save Changes
            </Button>
          </Row>
        </Column>
      </Card>
    </Column>
  );
}
