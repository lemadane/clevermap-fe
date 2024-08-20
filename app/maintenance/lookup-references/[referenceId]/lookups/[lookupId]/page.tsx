'use client'
import { createLookup, updateLookup } from '@/common/api/lookups'
import WmCheckbox from '@/common/components/WmCheckbox'
import { Button, TextField, Typography } from '@mui/material'
import useLookupState from '@/common/store/LookupState'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useWmToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

export type Props = Readonly<{
  params: {
    referenceId: string;
    lookupId: string;
  };
}>;

export default function LookupPage(props: Props) {
  const { referenceId, lookupId } = props.params
  const [isNew] = useState<boolean>(lookupId === 'new')
  const router = useRouter()
  const { lookup, setLookup, setLookupListChanged } = useLookupState(
    (state) => state
  )

  const toastState = useWmToastState((state) => state)

  const backToLookupListPage = () => {
    router.push(`/maintenance/lookup-references/${referenceId}/lookups`)
  }

  useEffect(() => {
    if (isNew) {
      setLookup(null)
    }
  }, [])

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await createLookup(referenceId, lookup!);
      } else {
        //eslint-disable-next-line
        var result = await updateLookup(referenceId, lookup!);
      }
      toastState.setState({
        ...toastState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      })
      setLookupListChanged(true)
      backToLookupListPage()
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      })
      backToLookupListPage()
    }
  }

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? 'Add New Lookup' : `Update ${lookup?.name}`}
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
            value={lookup?.name}
            onChange={(e) =>
              setLookup({
                ...lookup!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Hard Code'
            value={lookup?.hardCode}
            onChange={(e) =>
              setLookup({
                ...lookup!,
                hardCode: e.target.value,
              })
            }
          />
          <TextField
            label='Value'
            value={lookup?.value}
            onChange={(e) =>
              setLookup({
                ...lookup!,
                value: e.target.value,
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={lookup?.active as boolean}
            onChange={(e) =>
              setLookup({
                ...lookup!,
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
              onClick={backToLookupListPage}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  )
}
