'use client'
import WmCheckbox from '@/common/components/WmCheckbox'
import { Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useProvinceState from '@/common/store/ProvinceState'
import { createLocality, updateLocality } from '@/common/api/localities'
import useToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

type Props = Readonly<{
  params: {
    provinceId: string;
    cityId: string;
    localityId: string;
  };
}>;

export default function LocalityPage(props: Props) {
  const { provinceId, cityId, localityId } = props.params
  const [isNew] = useState<boolean>(localityId === 'new')
  const { locality, setLocality, setLocalityListChanged } = useProvinceState(
    (state) => state
  )
  const toastState = useToastState((state) => state)

  const router = useRouter()

  const backToLocalityListPage = () => {
    router.push(
      `/maintenance/provinces/${provinceId}/cities/${cityId}/localities`
    )
  }

  useEffect(() => {
    if (isNew) {
      setLocality(null)
    }
  }, [])

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await createLocality(cityId, locality!);
      } else {
        //eslint-disable-next-line
        var result = await updateLocality(cityId, locality!);
      }
      toastState.setState({
        ...toastState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      })
      setLocalityListChanged(true)
      backToLocalityListPage()
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      })
      setLocalityListChanged(false)
      backToLocalityListPage()
    }
  }

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? 'Add New Locality' : `Update ${locality?.name}`}
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
            value={locality?.name}
            onChange={(e) =>
              setLocality({
                ...locality!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Latitude(°N)'
            type='number'
            value={locality?.latitude}
            onChange={(e) =>
              setLocality({
                ...locality!,
                latitude: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label='Longitude(°E)'
            type='number'
            value={locality?.longitude}
            onChange={(e) =>
              setLocality({
                ...locality!,
                longitude: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label='Zip Code'
            type='number'
            value={locality?.zipCode}
            onChange={(e) =>
              setLocality({
                ...locality!,
                zipCode: parseInt(e.target.value),
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={locality?.active as boolean}
            onChange={(e) =>
              setLocality({
                ...locality!,
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
              onClick={() => backToLocalityListPage()}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  )
}
