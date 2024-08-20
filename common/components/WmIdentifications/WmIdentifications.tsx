import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import { Column, GridContainer, Row } from '../WmLayoutModes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WmAdditionalDetailsItem from './WmIdentificationsItem';
//import { WmDetailsState } from '@/common/store/WmDialogState';
import { useEffect, useState } from 'react';
import { API_URL } from '@/common/constants';
//import { MODULE_VS_IDENTIFICATIONS } from './WmContactDetailsDialog';
import { responseErrorCheck } from '@/common/utils';
import useWmToastState from '@/common/store/WmToastState';

type WmAddtionalDetailsProps = Readonly<{
  personId: string;
  title: string;
  addButtonCaption: string;
  AddUpdateDialog: () => JSX.Element;
  // dialogState: WmDetailsState;
}>;

export default function WmIdentifications(props: WmAddtionalDetailsProps) {
  const toastState = useWmToastState((state) => state);
  //const dialogState = props.dialogState;
  const [contactDetails, setContactDetails] = useState<any[]>([]);

  useEffect(() => {
    try {
      // const fetchContactDetails = async () => {
      //   const response = await fetch(
      //     `${API_URL}/${MODULE_VS_CONTACT_DETAILS}?RecordId=${props.personId}`
      //   );
      //   responseErrorCheck(response);
      //   const data = await response.json();
      //   setContactDetails(data.Result);
      // };
      // fetchContactDetails();
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
    }
  }, []);

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
            {props.title || 'title here'}
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
                  // dialogState.setNew(true);
                  // dialogState.openDialog(true);
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={600}
                >
                  {props.addButtonCaption || 'button caption here'}
                </Typography>
              </Button>
              {props.AddUpdateDialog()}
            </Row>
          </Column>
          <GridContainer gap='5px'>
            {contactDetails.map((item) => (
              <WmAdditionalDetailsItem key={item.ID}>
                <Column>
                  <Typography
                    fontSize={14}
                    fontWeight={300}
                    fontStyle='italic'
                    padding='5px 5px  1px 5px'
                    color='#1C1C1C'
                  >
                    {item.Type.Name}
                  </Typography>
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    padding='0px 5px  10px 5px'
                    color='#9D9D9D'
                  >
                    {item.Value}
                  </Typography>
                  <Typography
                    fontSize={12}
                    fontWeight={500}
                    padding='5px 5px  5px 5px'
                    color='#9D9D9D'
                  >
                    {item.Label}
                  </Typography>
                </Column>
              </WmAdditionalDetailsItem>
            ))}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
    </Column>
  );
}
