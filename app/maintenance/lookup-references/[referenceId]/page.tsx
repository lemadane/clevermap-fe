'use client'
import {
  createLookupReference,
  updateReference,
} from '@/common/api/lookupReferences'
import WmCheckbox from '@/common/components/WmCheckbox'
import { Button, TextField, Typography } from '@mui/material'
import useLookupState from '@/common/store/LookupState'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

export type Props = Readonly<{
  params: {
    referenceId: string;
  };
}>;

export default function LookupReference(props: Props) {
  const { referenceId } = props.params
  const [isNew] = useState<boolean>(referenceId === 'new')
  const router = useRouter()
  const { setReference, reference, setReferenceListChanged } = useLookupState(
    (state) => state
  )

  const toastState = useToastState((state) => state)

  useEffect(() => {
    if (isNew) {
      setReference(null)
    }
  }, [])

  const backToLookupReferenceListPage = () => {
    router.push('/maintenance/lookup-references')
  }

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await createLookupReference(reference!);
      } else {
        //eslint-disable-next-line
        var result = await updateReference(reference!);
      }
      toastState.setState({
        ...toastState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      })
      setReferenceListChanged(true)
      backToLookupReferenceListPage()
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      })
      backToLookupReferenceListPage()
    }
  }

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? 'Add New Lookup Reference' : `Update ${reference?.name}`}
        </Typography>
      </Column>
      <Column
        sx={{
          paddingX: '40px',
          paddingY: '20px',
        }}
        justifyContent='center'
        alignContent='center'
      >
        <Column
          justifyContent='center'
          gap='2em'
        >
          <TextField
            label='Name'
            value={reference?.name}
            onChange={(e) =>
              setReference({
                ...reference!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Hard Code'
            value={reference?.hardCode}
            onChange={(e) =>
              setReference({
                ...reference!,
                hardCode: e.target.value,
              })
            }
          />
          <TextField
            label='Value'
            value={reference?.value}
            onChange={(e) =>
              setReference({
                ...reference!,
                value: e.target.value,
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={reference?.active as boolean}
            onChange={(e) =>
              setReference({
                ...reference!,
                active: e.target.checked,
              })
            }
          />
          <Row justifyContent='right'>
            <Button
              variant='contained'
              onClick={handleSave}
              sx={{ marginRight: '20px' }}
            >
              Save
            </Button>
            <Button
              variant='outlined'
              onClick={backToLookupReferenceListPage}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  )
}
