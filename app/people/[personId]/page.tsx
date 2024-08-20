'use client'
import { WmPersonalDetails } from '@/common/components/WmPersonalDetails'
import { Button } from '@mui/material'
import { Column, Row } from '@/common/components/WmLayoutModes'
import WmContactDetails from '@/common/components/WmContactDetails/WmContactDetails'
import WmAddresses from '@/common/components/WmAddresses/WmAddresses'

type PersonProps = Readonly<{
  params: {
    personId: string;
  };
}>;

export default function Person(props: PersonProps) {
  const { personId } = props.params

  return (
    <>
      <Column
        justifyContent='center'
        alignItems='center'
        width='98vw'
        height='auto'
        spacing={2}
      >
        <WmPersonalDetails personId={personId} />

        {/* <WmIdentfication
          title='Identification'
          addButtonCaption='Add Identification'
          AddUpdateDialog={()=>(<WmIdentificationDialog />)}
        /> */}

        <WmContactDetails personId={personId} />

        <WmAddresses personId={personId} />

        <Row
          justifyContent='left'
          alignItems='left'
          width={'98%'}
          sx={{
            padding: '20px',
          }}
        >
          <Button
            variant='contained'
            onClick={() => {
              window.history.back()
            }}
          >
            Back
          </Button>
        </Row>
      </Column>
    </>
  )
}
