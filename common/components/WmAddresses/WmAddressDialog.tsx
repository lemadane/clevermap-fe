'use client';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GridContainer, GridItem, Row } from '../WmLayoutModes';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WmTextField from '../WmTextField';
import { WmSelector } from '../WmSelector';
import { getLookupList } from '@/common/api/lookups';
import { getProvinceList } from '@/common/api/provinces';
import { useAddressListState } from '@/common/store/DetailsState';
import { LOOKUP_REF_IDS } from '@/common/constants';
import { getCityList } from '@/common/api/cities';
import { getLocalityList } from '@/common/api/localities';
import useWmToastState from '@/common/store/WmToastState';
import { WmTextFieldInitialState } from '@/common/store/WmTextFieldState';
import { WmSelectorInitialState } from '@/common/store/WmSelectorState';
import { IdAndName } from '@/common/types';
import { createAddress, fetchAddress, updateAddress } from '@/common/api/addresses';

type WmAddressDialogProps = Readonly<{
  personId: string;
}>;

export default function WmAddressDialog(props: WmAddressDialogProps) {
  const addressesState = useAddressListState();
  const toastState = useWmToastState();
  const [virgin, setVirgin] = useState(true);
  const [valueState, setValueState] = useState(WmTextFieldInitialState);
  const [labelState, setLabelState] = useState(WmTextFieldInitialState);
  const [typeState, setTypeState] = useState(WmSelectorInitialState);
  const [provinceState, setProvinceState] = useState(WmSelectorInitialState);
  const [cityState, setCityState] = useState(WmSelectorInitialState);
  const [localityState, setLocalityState] = useState(WmSelectorInitialState);

  // reset fields when dialog is opened
  useEffect(() => {
    try {
      if (addressesState.isNew) {
        setTypeState(WmSelectorInitialState);
        setProvinceState(WmSelectorInitialState);
        setCityState(WmSelectorInitialState);
        setLocalityState(WmSelectorInitialState);
        setLabelState(WmTextFieldInitialState);
        setValueState(WmTextFieldInitialState);
        setVirgin(true);
        return;
      }
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  }, [addressesState.isNew, addressesState.dialogOpened]);

  // fetch contact detail  
  useEffect(() => {
    try {
      if (
        !addressesState.dialogOpened ||
        addressesState.isNew ||
        !addressesState.itemId
      ) {
        return;
      }
      (async () => {
        const address = await fetchAddress(
          addressesState.itemId as string
        );
        setLabelState({
          ...labelState,
          value: address.label,
        });

        setTypeState({
          ...typeState,
          value: address.type,
        });
        setProvinceState({
          ...provinceState,
          value: address.province,
        });
        setCityState({
          ...cityState,
          value: address.city,
        });
        setLocalityState({
          ...localityState,
          value: address.locality,
        });
        setValueState({
          ...valueState,
          value: address.value,
        });
        setVirgin(true);
      })();
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  }, [
    addressesState.dialogOpened,
    addressesState.isNew,
    addressesState.itemId,
  ]);


  // fetch address types
  useEffect(() => {
    try {
      const fetchAddressTypes = async () => {
        if (typeState.lookups.length > 0) {
          return;
        }
        const types = await getLookupList(LOOKUP_REF_IDS.ADDRESS_TYPES);
        setTypeState({
          ...typeState,
          lookups: types.map(
            (item) =>
              ({
                id: parseInt(item.id!),
                name: item.name,
              } as IdAndName)
          ),
        });
      };
      fetchAddressTypes();
    } catch (error) {
      useWmToastState.setState({
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  }, [typeState.lookups.length]);

  // fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      const list = await getProvinceList();
      setProvinceState({
        ...provinceState,
        lookups: list.map(
          (item) =>
            ({
              id: parseInt(item.id!),
              name: item.name,
            } as IdAndName)
        ),
      });
    };
    fetchProvinces();
  }, [provinceState.lookups.length]);

  // fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (!provinceState.value.id) {
          return;
        }
        const list = await getCityList(provinceState.value.id);
        setCityState({
          ...cityState,
          lookups: list.map((item) => ({
            id: parseInt(item.id!),
            name: item.name,
          })),
        });
      } catch (error) {
        toastState.setState({
          ...toastState,
          message: (error as Error).message,
          severity: 'error',
          visibility: true,
        });
      }
    };
    fetchCities();
  }, [provinceState.value]);

  // fetch localities
  useEffect(() => {
    const fetchLocalities = async () => {
      if (!cityState.value.id) {
        return;
      }
      const list = await getLocalityList(cityState.value.id);
      setLocalityState({
        ...localityState,
        lookups: list.map(
          (item) =>
            ({
              id: parseInt(item.id!),
              name: item.name,
            } as IdAndName)
        ),
      });
    };
    fetchLocalities();
  }, [cityState.value.id]);

  // handle save button click
  const handleClick = async () => {
    try {
      validate();
      let data;
      if (addressesState.isNew) {
        data = await createAddress({
          personId: props.personId,
          typeId: typeState.value.id,
          provinceId: provinceState.value.id,
          cityId: cityState.value.id,
          localityId: localityState.value.id,
          label: labelState.value,
          value: valueState.value,
          latitude: 0,
          longitude: 0,
        });
      } else {
        data = await updateAddress(addressesState.itemId as string, {
          personId: props.personId,
          typeId: typeState.value.id,
          label: labelState.value,
          provinceId: provinceState.value.id,
          cityId: cityState.value.id,
          localityId: localityState.value.id,
          value: valueState.value,
          active: true,
        });
      }
      toastState.setState({
        ...toastState,
        message: data.Message,
        severity: data.IsSuccess ? 'success' : 'error',
        visibility: true,
      });
      addressesState.openDialog(false);
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  };

  const validateLabel = () => {
    if (labelState.value === '') {
      setLabelState({
        ...labelState,
        hasError: true,
        errorMessage: 'Label is required',
      });
      return;
    }
    setLabelState({
      ...labelState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateType = () => {
    if (!typeState.value.id) {
      setTypeState({
        ...typeState,
        hasError: true,
        errorMessage: 'Type is required',
      });
      return;
    }
    setTypeState({
      ...typeState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateProvince = () => {
    if (!provinceState.value.id) {
      setProvinceState({
        ...provinceState,
        hasError: true,
        errorMessage: 'Province is required',
      });
      return;
    }
    setProvinceState({
      ...provinceState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateCity = () => {
    if (!cityState.value.id) {
      setCityState({
        ...cityState,
        hasError: true,
        errorMessage: 'City is required',
      });
      return;
    }
    setCityState({
      ...cityState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateLocality = () => {
    if (!localityState.value.id) {
      setLocalityState({
        ...localityState,
        hasError: true,
        errorMessage: 'Locality is required',
      });
      return;
    }
    setLocalityState({
      ...localityState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateValue = () => {
    if (valueState.value === '') {
      setValueState({
        ...valueState,
        hasError: true,
        errorMessage: 'Value is required',
      });
      return;
    }
    setValueState({
      ...valueState,
      hasError: false,
      errorMessage: '',
    });
  };
  
  const validate = () => {
    validateLabel();
    validateType();
    validateProvince();
    validateCity();
    validateLocality();
    validateValue();
  }

  // rendering the dialog
  return (
    <Dialog
      open={addressesState.dialogOpened}
      onClose={() => addressesState.openDialog(false)}
    >
      <Row justifyContent='right'></Row>
      <Row justifyContent='space-between'>
        <DialogTitle
          fontSize={20}
          fontWeight={600}
        >
          {addressesState.isNew ? 'Add' : 'Update'} Address
        </DialogTitle>
        <IconButton
          sx={{
            paddingRight: '20px',
            minHeight: '0px',
            minWidth: '0px',
          }}
          onClick={() => addressesState.openDialog(false)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Row>
      <DialogContent>
        <GridContainer
          justifyItems='center'
          spacing={1}
        >
          <GridItem
            xs={12}
            md={6}
            width='100%'
            paddingBottom='20px'
          >
            <WmTextField
              sx={{
                width: 'inherit',
              }}
              label='Label'
              state={labelState}
              onChange={(e) => {
                e.preventDefault();
                setLabelState({
                  ...labelState,
                  value: e.target.value,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateLabel();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={6}
            width='100%'
            paddingBottom='20px'
          >
            <WmSelector
              label='Address Type'
              selectorState={typeState}
              onChange={(e) => {
                e.preventDefault();
                const found = typeState.lookups.find(
                  (item) => item.name === e.target.value
                ) as IdAndName;
                setTypeState({
                  ...typeState,
                  value: found,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateType();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={4}
            width='100%'
            paddingBottom='20px'
          >
            <WmSelector
              label='Province'
              selectorState={provinceState}
              onChange={(e) => {
                e.preventDefault();
                const found = provinceState.lookups.find(
                  (item) => item.name === e.target.value
                ) as IdAndName;
                setProvinceState({
                  ...provinceState,
                  value: found,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateProvince();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={4}
            width='100%'
            paddingBottom='20px'
          >
            <WmSelector
              label='City/Municipality'
              selectorState={cityState}
              onChange={(e) => {
                e.preventDefault();
                const found = cityState.lookups.find(
                  (item) => item.name === e.target.value
                ) as IdAndName;
                setCityState({
                  ...cityState,
                  value: found,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateCity();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={4}
            width='100%'
            paddingBottom='20px'
          >
            <WmSelector
              label='Barangay'
              selectorState={localityState}
              onChange={(e) => {
                e.preventDefault();
                const found = localityState.lookups.find(
                  (item) => item.name === e.target.value
                ) as IdAndName;
                setLocalityState({
                  ...localityState,
                  value: found,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateLocality();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={12}
            width='100%'
            paddingBottom='20px'
          >
            <WmTextField
              sx={{
                width: 'inherit',
              }}
              label='Unit, House Number, Street, etc.'
              state={valueState}
              onChange={(e) => {
                e.preventDefault();
                setValueState({
                  ...valueState,
                  value: e.target.value,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                setVirgin(false);
                validateValue();
              }}
            />
          </GridItem>
          <GridItem
            xs={12}
            md={12}
            width='60%'
            display='flex'
            justifyContent='center'
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={(e) => handleClick()}
              sx={{
                width: 'inherit',
                paddingY: '10px',
              }}
              disabled={
                virgin ||
                labelState.hasError ||
                valueState.hasError ||
                typeState.hasError ||
                provinceState.hasError ||
                cityState.hasError ||
                localityState.hasError
              }
            >
              {addressesState.isNew ? 'Add' : 'Update'} Address
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
