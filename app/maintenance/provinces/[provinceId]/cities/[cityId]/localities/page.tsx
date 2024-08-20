'use client'
import { Fab, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Locality } from '@/common/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useProvinceState from '@/common/store/ProvinceState'
import { getLocalityList } from '@/common/api/localities'
import { Column, Row } from '@/common/components/WmLayoutModes'

export type Props = Readonly<{
  params: {
    provinceId: string;
    cityId: string;
  };
}>;

export default function LocalityListPage(props: Props) {
  const { cityId, provinceId } = props.params
  const [localityList, setLocalityList] = useState<Locality[]>([])
  const setLocality = useProvinceState((state) => state.setLocality)
  const localityListChanged = useProvinceState(
    (state) => state.localityListChanged
  )
  
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'cityId',
      headerName: 'City ID',
      type: 'number',
      width: 75,
    },
    { field: 'id', headerName: 'ID', type: 'number', width: 75 },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      editable: true,
      width: 150,
    },
    {
      field: 'latitude',
      headerName: 'Latitude(°N)',
      type: 'number',
      editable: true,
      width: 150,
    },
    {
      field: 'longitude',
      headerName: 'Longitude(°E)',
      type: 'number',
      editable: true,
      width: 200,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      type: 'string',
      editable: true,
      width: 200,
    },
    { field: 'timestamp', headerName: 'Timestamp', type: 'string', width: 150 },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'string',
      width: 150,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      type: 'string',
      width: 150,
    },
    { field: 'userId', headerName: 'User ID', type: 'string', width: 75 },
    { field: 'active', headerName: 'Activated', type: 'boolean', width: 75 },
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Row spacing={1}>
            <IconButton
              onClick={() => {
                setLocality(params.row)
                router.push(
                  `/maintenance/provinces/${provinceId}/cities/${cityId}/localities/${params.row.id}`
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
      setLocality(null)
      if (localityListChanged) {
        const list = await getLocalityList(cityId)
        setLocalityList(list)
      }
    })()
  }, [localityListChanged])

  return (
    <>
      <Column>
        <Typography variant='h6'>Localities</Typography>
      </Column>
      <Row
        justifyContent='right'
        alignContent='center'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push(
              `/maintenance/provinces/${provinceId}/cities/${cityId}/localities/new`
            )
          }}
        >
          <AddIcon />
        </Fab>
      </Row>
      <DataGrid
        rows={localityList}
        columns={columns}
        editMode='row'
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </>
  )
}
