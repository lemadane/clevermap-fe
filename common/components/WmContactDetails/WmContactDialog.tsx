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
import {
  LOOKUP_REF_IDS,
  WmEmailRegex,
  WmLandlineRegex,
  WmMobileRegex,
} from '@/common/constants';
import useWmToastState from '@/common/store/WmToastState';
import { useContactDetailsState } from '@/common/store/DetailsState';
import {
  createContactDetail,
  fetchContactDetail,
  updateContactDetail,
} from '@/common/api/contactDetails';
import { WmTextFieldInitialState } from '@/common/store/WmTextFieldState';
import { WmSelectorInitialState } from '@/common/store/WmSelectorState';
import { IdAndName } from '@/common/types';

type WmContactDetailsDialogProps = Readonly<{
  personId: string;
}>;

export default function WmContactDialog(props: WmContactDetailsDialogProps) {
  const toastState = useWmToastState((state) => state);
  const contactDetailState = useContactDetailsState((state) => state);
  const [virgin, setVirgin] = useState(true);
  const [labelState, setLabelState] = useState(WmTextFieldInitialState);
  const [valueState, setValueState] = useState(WmTextFieldInitialState);
  const [typeState, setTypeState] = useState(WmSelectorInitialState);

  /*
   * Reset the form fields when the dialog is opened
   * and it is a new contact detail
   */
  useEffect(() => {
    if (contactDetailState.isNew && contactDetailState.dialogOpened) {
      setLabelState(WmTextFieldInitialState);
      setValueState(WmTextFieldInitialState);
      setTypeState(WmSelectorInitialState);
      setVirgin(true);
    }
  }, [
    contactDetailState.dialogOpened,
    contactDetailState.isNew
  ]);

  /*
   * Fetch the contact detail when the dialog is opened
   * and it is not a new contact detail
   */
  useEffect(() => {
    try {
      if (
        !contactDetailState.dialogOpened ||
        contactDetailState.isNew ||
        !contactDetailState.itemId
      ) {
        return;
      }
      (async () => {
        const contactDetail = await fetchContactDetail(
          contactDetailState.itemId as string
        );
        setLabelState({
          ...labelState,
          value: contactDetail.label,
        });
        setValueState({
          ...valueState,
          value: contactDetail.value,
        });
        setTypeState({
          ...typeState,
          value: contactDetail.type,
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
    contactDetailState.dialogOpened,
    contactDetailState.isNew,
    contactDetailState.itemId,
  ]);

  /*
   * Fetch the contact detail types from the API
   * and set the state
   */
  useEffect(() => {
    const fetchContactDetailTypes = async () => {
      const list = await getLookupList(LOOKUP_REF_IDS.CONTACT_TYPES);
      setTypeState({
        ...typeState,
        lookups: list.map(
          (item) =>
            ({
              id: parseInt(item.id!),
              name: item.name,
            } as IdAndName)
        ),
      });
    };
    fetchContactDetailTypes();
  }, [typeState.lookups.length]);

  /*
   * Handle the click event of the add/update button
   * and call the respective API
   */
  const handleClick = async () => {
    try {
      validateAll();
      let data;
      if (contactDetailState.isNew) {
        data = await createContactDetail({
          personId: props.personId,
          typeId: typeState.value.id,
          label: labelState.value,
          value: valueState.value,
        });
      } else {
        data = await updateContactDetail(contactDetailState.itemId as string, {
          personId: props.personId,
          typeId: typeState.value.id,
          label: labelState.value,
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
      setLabelState({
        ...labelState,
        value: '',
      });
      setValueState({
        ...valueState,
        value: '',
      });
      setTypeState({
        ...typeState,
        value: { id: 0, name: '' },
      });
      contactDetailState.openDialog(false);
      contactDetailState.toggleChanged();
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
    } else {
      setTypeState({
        ...typeState,
        hasError: false,
        errorMessage: '',
      });
    }
  };

  const validateValue = () => {
    if (
      typeState.value.name.toLowerCase().includes('email') &&
      !WmEmailRegex.test(valueState.value)
    ) {
      setValueState({
        ...valueState,
        hasError: true,
        errorMessage: 'Invalid email address',
      });
      return;
    }
    if (
      typeState.value.name.toLowerCase().includes('mobile') &&
      !valueState.value.match(WmMobileRegex)
    ) {
      console.log('hello');
      setValueState({
        ...valueState,
        hasError: true,
        errorMessage: 'Invalid mobile number',
      });
      return;
    }
    if (
      typeState.value.name.toLowerCase().includes('landline') &&
      !WmLandlineRegex.test(valueState.value)
    ) {
      setValueState({
        ...valueState,
        hasError: true,
        errorMessage: 'Invalid landline number',
      });
      return;
    }
    console.log('world');
    setValueState({
      ...valueState,
      hasError: false,
      errorMessage: '',
    });
  };

  const validateAll = () => {
    validateLabel();
    validateType();
    validateValue();
  };

  return (
    <Dialog
      open={contactDetailState.dialogOpened}
      onClose={() => contactDetailState.openDialog(false)}
    >
      <Row justifyContent='right'></Row>
      <Row justifyContent='space-between'>
        <DialogTitle
          fontSize={20}
          fontWeight={600}
        >
          {contactDetailState.isNew ? 'Add' : 'Update'} Contact Details
        </DialogTitle>
        <IconButton
          sx={{
            paddingRight: '20px',
            minHeight: '0px',
            minWidth: '0px',
          }}
          onClick={() => contactDetailState.openDialog(false)}
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
                validateLabel();
              }}
              sx={{
                width: 'inherit',
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
              label='Type'
              selectorState={typeState}
              onChange={(e) => {
                e.preventDefault();
                const found = typeState.lookups.find(
                  (item) => item.name === e.target.value
                );
                setTypeState({
                  ...typeState,
                  value: found as IdAndName,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                validateType();
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
              label='Value'
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
              sx={{
                width: 'inherit',
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
                typeState.hasError
              }
            >
              {contactDetailState.isNew ? 'Add' : 'Update'} Contact Details
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
