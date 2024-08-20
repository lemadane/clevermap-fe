'use client'
import { Fab, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Province } from '@/common/types'
import { useEffect, useState } from 'react'
import { getProvinceList } from '@/common/api/provinces'
import useProvinceState from '@/common/store/ProvinceState'
import { useRouter } from 'next/navigation'
import useToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

export default function ProvinceListPage() {
  const [provinceList, setProvinceList] = useState<Province[]>([])
  const { setProvince, setCity, provinceListChanged } = useProvinceState(
    (state) => state
  )
  const router = useRouter()
  const toastState = useToastState((state) => state)

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 60 },
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
      width: 120,
    },
    {
      field: 'longitude',
      headerName: 'Longitude(°E)',
      type: 'number',
      width: 120,
    },
    { field: 'active', headerName: 'Activated', type: 'boolean', width: 80 },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      type: 'string',
      width: 180,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'string',
      width: 180,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      type: 'string',
      width: 120,
    },
    { field: 'userId', headerName: 'User ID', type: 'string', width: 120 },

    {
      field: 'update',
      headerName: 'Update',
      width: 60,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Row spacing={1}>
            <IconButton
              onClick={() => {
                setProvince(params.row)
                router.push(`/maintenance/provinces/${params.row.id}`)
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
      setProvince(null)
      setCity(null)
      if (provinceListChanged) {
        try {
          const list = await getProvinceList()
          setProvinceList(list)
        } catch (error) {
          toastState.setState({
            ...toastState,
            message: (error as Error).message,
            severity: 'error',
            visibility: true,
          })
          return
        }
      }
    })()
  }, [provinceListChanged])

  return (
    <>
      <Column>
        <Typography variant='h6'>Provinces</Typography>
      </Column>
      <Row
        justifyContent='right'
        alignContent='center'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push('/maintenance/provinces/new')
          }}
        >
          <AddIcon />
        </Fab>
      </Row>
      <DataGrid
        rows={provinceList}
        columns={columns}
        editMode='row'
        pageSizeOptions={[10, 25, 50, 100]}
        onRowDoubleClick={(params) => {
          setProvince(params.row)
          router.push(`/maintenance/provinces/${params.row.id}`)
        }}
      />
    </>
  )
}
