'use client'
import { Fab, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { City } from '@/common/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useProvinceState from '@/common/store/ProvinceState'
import { getCityList } from '@/common/api/cities'
import { Column, Row } from '@/common/components/WmLayoutModes'

type Props = {
  params: {
    provinceId: string;
  };
};

export default function CityListPage(props: Props) {
  const { provinceId } = props.params
  const [cityList, setCityList] = useState<City[]>([])
  const setCity = useProvinceState((state) => state.setCity)
  const cityListChanged = useProvinceState((state) => state.cityListChanged)
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'provinceId',
      headerName: 'Province ID',
      type: 'string',
      width: 80,
    },
    {
      field: 'id',
      headerName: 'ID',
      type: 'string',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 180,
    },
    {
      field: 'latitude',
      headerName: 'Latitude(°N)',
      type: 'number',
      width: 100,
    },
    {
      field: 'longitude',
      headerName: 'Longitude(°E)',
      type: 'number',
      width: 100,
    },
    {
      field: 'areaCode',
      headerName: 'Area Code',
      type: 'number',
      editable: true,
      width: 100,
    },
    {
      field: 'active',
      headerName: 'Activated',
      type: 'boolean',
      width: 75,
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      type: 'string',
      width: 170,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'string',
      width: 170,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      type: 'string',
      width: 150,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      type: 'string',
      width: 75,
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Row spacing={1}>
            <IconButton
              onClick={() => {
                setCity(params.row)
                router.push(
                  `/maintenance/provinces/${provinceId}/cities/${params.row.id}`
                )
              }}
            >
              <EditIcon color='primary' />
            </IconButton>
          </Row>
        )
      },
    },
  ]

  useEffect(() => {
    (async () => {
      setCity(null)
      if (cityListChanged) {
        const list = await getCityList(provinceId)
        setCityList(list)
      }
    })()
  }, [cityListChanged])

  return (
    <>
      <Column>
        <Typography variant='h6'>Cities</Typography>
      </Column>
      <Row
        justifyContent='right'
        alignContent='center'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push(`/provinces/${provinceId}/cities/new`)
          }}
        >
          <AddIcon />
        </Fab>
      </Row>
      <DataGrid
        rows={cityList}
        columns={columns}
        editMode='row'
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </>
  )
}
