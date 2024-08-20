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
import useWmToastState from '@/common/store/WmToastState';
import { WmTextFieldInitialState } from '@/common/store/WmTextFieldState';
import { WmSelectorInitialState } from '@/common/store/WmSelectorState';
import { useAddressListState } from '@/common/store/DetailsState';
import { IdAndName } from '@/common/types';

export default function WmIdentificationDialog() {
  const toastState = useWmToastState((state) => state);
  const addressListState = useAddressListState((state) => state);
  const [virgin, setVirgin] = useState(true);
  const [labelState, setLabelState] = useState(WmTextFieldInitialState);
  const [valueState, setValueState] = useState(WmTextFieldInitialState);
  const [typeState, setTypeState] = useState(WmSelectorInitialState);

  const CONTACT_DETAILS_REF_ID = '2';

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (typeState.lookups.length > 0) {
        return;
      }
      const list = await getLookupList(CONTACT_DETAILS_REF_ID);
      setTypeState({
        ...typeState,
        lookups: list.map((item) => ({
          id: parseInt(item.id!),
          name: item.name,
        })),
      });
    };
    fetchContactDetails();
  }, []);

  return (
    <Dialog
      open={false}
      // onClose={() => dialogState.openDialog(false)}
    >
      <Row justifyContent='right'></Row>
      <Row justifyContent='space-between'>
        <DialogTitle
          fontSize={20}
          fontWeight={600}
        >
          {/* {dialogState.isNew ? 'Add' : 'Update'} Identification */}
        </DialogTitle>
        <IconButton
          sx={{
            paddingRight: '20px',
            minHeight: '0px',
            minWidth: '0px',
          }}
          // onClick={() => dialogState.openDialog(false)}
          autoFocus
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Row>
      <DialogContent>
        <GridContainer justifyItems='center'>
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
                //validate();
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
                ) as IdAndName;
                setTypeState({
                  ...typeState,
                  value: found,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                //validate();
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
              sx={{
                width: 'inherit',
              }}
              onChange={(e) => {
                e.preventDefault();
                setValueState({
                  ...valueState,
                  value: e.target.value,
                });
              }}
              onBlur={(e) => {
                e.preventDefault();
                //validate();
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
              // color='secondary'
              // onClick={() => dialogState.openDialog(false)}
              sx={{
                width: 'inherit',
                paddingY: '10px',
              }}
            >
              {/* {dialogState.isNew ? 'Add' : 'Update'} Identification */}
            </Button>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
