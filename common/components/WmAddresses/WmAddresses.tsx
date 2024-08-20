'use client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import { Column, GridContainer, Row } from '../WmLayoutModes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WmAddressItem from './WmAddresssItem';
import { useEffect, useState } from 'react';
import useWmToastState from '@/common/store/WmToastState';
import WmAddressDialog from './WmAddressDialog';
import { useAddressListState } from '@/common/store/DetailsState';
import { fetchAddressListOf } from '@/common/api/addresses';

type WmAddtionalDetailsProps = Readonly<{
  personId: string;
}>;

export default function WmAddresses(props: WmAddtionalDetailsProps) {
  const toastState = useWmToastState((state) => state);
  const addressesState = useAddressListState((state) => state);
  const [addressList, setAddressList] = useState<any[]>([]);

  useEffect(
    () => {
      try {
        (async () => {
          if (!props.personId) {
            throw new Error('No person ID');
          }
          const list = await fetchAddressListOf(props.personId);
          setAddressList(list);
        })();
      } catch (error) {
        toastState.setState({
          ...toastState,
          message: (error as Error).message,
          severity: 'error',
          visibility: true,
        });
      }
    },
    [
      addressesState.changed,
    ]
  );

  return (
    <Column
      justifyContent='center'
      alignItems='center'
      width='inherit'
    >
      <Accordion
        sx={{
          width: '98%',
          border: '2px solid #ccc',
          borderRadius: '6px',
          boxShadow:
            '0px 1px 1px rgba(0, 0, 0, 0.08), ' +
            '0px 2px 1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            flexDirection: 'row-reverse',
          }}
        >
          <Typography
            marginLeft='5px'
            fontWeight={600}
            fontSize={20}
          >
            Addresses
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Column
            justifyContent='center'
            alignItems='left'
            width='inherit'
          >
            <Row width='inherit'>
              <Button
                variant='outlined'
                onClick={() => {
                  try {
                  addressesState.setNew(true);
                  addressesState.openDialog(true);
                  } catch (error) {
                    toastState.setState({
                      ...toastState,
                      message: (error as Error).message,
                      severity: 'error',
                      visibility: true,
                    });
                  }
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                >
                  Add Address
                </Typography>
              </Button>
              <WmAddressDialog personId={props.personId} />
            </Row>
          </Column>
          <GridContainer gap='5px'>
            {addressList.map((item) => (
              <WmAddressItem
                key={item.id}
                onClick={() => {
                  try {
                  addressesState.setNew(false);
                  addressesState.setItemId(item.id);
                  addressesState.openDialog(true);
                  } catch (error) {
                    toastState.setState({
                      ...toastState,
                      message: (error as Error).message,
                      severity: 'error',
                      visibility: true,
                    });
                  }
                }}
              >
                <Column>
                  <Typography
                    fontSize={14}
                    fontWeight={300}
                    fontStyle='italic'
                    padding='5px 5px  1px 5px'
                    color='#1C1C1C'
                  >
                    {item.type.name}
                  </Typography>
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    padding='0px 5px  10px 5px'
                    color='#9D9D9D'
                  >
                    {item.value}, <br />
                    {item.locality.name}
                    <br />
                    {item.city.name}, {item.province.name}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={500}
                    padding='5px 5px  5px 5px'
                    color='#9D9D9D'
                  >
                    {item.label}
                  </Typography>
                </Column>
              </WmAddressItem>
            ))}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
    </Column>
  );
}
