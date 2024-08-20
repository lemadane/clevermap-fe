'use client'
import WmCheckbox from '@/common/components/WmCheckbox'
import { Button, TextField, Typography } from '@mui/material'
import useProvinceState from '@/common/store/ProvinceState'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProvince, updateProvince } from '@/common/api/provinces'
import useToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

type Props = {
  params: {
    provinceId: string;
  };
};

export default function ProvincePage(props: Props) {
  const { provinceId } = props.params
  const [isNew] = useState<boolean>(provinceId === 'new')
  const router = useRouter()
  const { setProvince, province, setProvinceListChanged } = useProvinceState(
    (state) => state
  )
  const toastState = useToastState((state) => state)

  useEffect(() => {
    if (isNew) {
      setProvince(null)
    }
  }, [])

  const backToProvinceListPage = () => {
    router.push('/maintenance/provinces')
  }

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await createProvince(province!);
      } else {
        //eslint-disable-next-line
        var result = await updateProvince(province!);
      }
      toastState.setState({
        ...toastState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      })
      setProvinceListChanged(true)
      backToProvinceListPage()
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      })
      backToProvinceListPage()
    }
  }

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? 'Add New Province' : `Update ${province?.name}`}
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
            value={province?.name}
            onChange={(e) =>
              setProvince({
                ...province!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Latitude(°N)'
            type='number'
            value={province?.latitude}
            onChange={(e) =>
              setProvince({
                ...province!,
                latitude: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label='Longitude(°E)'
            type='number'
            value={province?.longitude}
            onChange={(e) =>
              setProvince({
                ...province!,
                longitude: parseFloat(e.target.value),
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={province?.active as boolean}
            onChange={(e) =>
              setProvince({
                ...province!,
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
              onClick={backToProvinceListPage}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  )
}
