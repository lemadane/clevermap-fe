'use client'
import { createCity, updateCity } from '@/common/api/cities'
import WmCheckbox from '@/common/components/WmCheckbox'
import { Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useProvinceState from '@/common/store/ProvinceState'
import useToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

type Props = Readonly<{
  params: {
    provinceId: string;
    cityId: string;
  };
}>;

export default function CityPage(props: Props) {
  const { provinceId, cityId } = props.params
  const [isNew] = useState<boolean>(cityId === 'new')
  const { city, setCity, setCityListChanged } = useProvinceState(
    (state) => state
  )
  const toastState = useToastState((state) => state)

  const router = useRouter()

  useEffect(() => {
    if (isNew) {
      setCity(null)
    }
  }, [])

  const backToCityListPage = () => {
    router.push(`/maintenance/provinces/${provinceId}/cities`)
  }

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await createCity(provinceId, city!);
      } else {
        //eslint-disable-next-line
        var result = await updateCity(provinceId, city!);
      }
      toastState.setState({
        ...toastState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      })
      setCityListChanged(true)
      backToCityListPage()
    } catch (error) {
      toastState.setState({
        ...toastState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      })
      backToCityListPage()
    }
  }

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? 'Add New City' : `Update ${city?.name}`}
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
            value={city?.name}
            onChange={(e) =>
              setCity({
                ...city!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Latitude(°N)'
            type='number'
            value={city?.latitude}
            onChange={(e) =>
              setCity({
                ...city!,
                latitude: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label='Longitude(°E)'
            type='number'
            value={city?.longitude}
            onChange={(e) =>
              setCity({
                ...city!,
                longitude: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            label='Area Code'
            type='number'
            value={city?.areaCode}
            onChange={(e) =>
              setCity({
                ...city!,
                areaCode: parseFloat(e.target.value),
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={city?.active as boolean}
            onChange={(e) =>
              setCity({
                ...city!,
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
              onClick={backToCityListPage}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  )
}
