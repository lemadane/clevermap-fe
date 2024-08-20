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
import WmContactItem from './WmContactItem';
import { useContactDetailsState } from '@/common/store/DetailsState';
import { useEffect, useState } from 'react';
import useWmToastState from '@/common/store/WmToastState';
import { fetchContactDetailsOf } from '@/common/api/contactDetails';
import WmContactDialog from './WmContactDialog';

type WmContactsProps = Readonly<{
  personId: string;
}>;

type ContactType = Readonly<{
  id: string;
  type: {
    id: string;
    name: string;
  };
  value: string;
  label: string;
  personId?: string;
}>;

export default function WmContactDetails(props: WmContactsProps) {
  const [contactDetails, setContactDetails] = useState<ContactType[]>([]);
  const contactDetailsState = useContactDetailsState((state) => state);
  const toastState = useWmToastState((state) => state);

  useEffect(() => {
    try {
      (async () => {
        if (!props.personId) {
          return;
        }
        const list = await fetchContactDetailsOf(props.personId);
        setContactDetails(list);
      })();
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  }, [contactDetailsState.changed]);

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
            Contact Details
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
                  contactDetailsState.setNew(true);
                  contactDetailsState.openDialog(true);
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                >
                  Add Contact
                </Typography>
              </Button>
              <WmContactDialog personId={props.personId} />
            </Row>
          </Column>
          <GridContainer gap='5px'>
            {contactDetails?.map((item) => (
              <WmContactItem
                key={item.id}
                onClick={() => {
                  contactDetailsState.setNew(false);
                  contactDetailsState.setItemId(item.id);
                  contactDetailsState.openDialog(true);
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
                    {item.value}
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
              </WmContactItem>
            ))}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
    </Column>
  );
}
