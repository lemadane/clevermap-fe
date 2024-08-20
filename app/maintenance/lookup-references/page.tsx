'use client'
import { Fab, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { LookupReference } from '@/common/types'
import { useEffect, useState } from 'react'
import { getLookupReferenceList } from '@/common/api/lookupReferences'
import useLookupState from '@/common/store/LookupState'
import { useRouter } from 'next/navigation'
import useWmToastState from '@/common/store/WmToastState'
import { Column, Row } from '@/common/components/WmLayoutModes'

export default function LookupReferences() {
  const [referenceList, setReferenceList] = useState<LookupReference[]>([])
  const { setReference, setLookup, referenceListChanged } = useLookupState(
    (state) => state
  )
  const toasState = useWmToastState((state) => state)
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 180,
    },
    {
      field: 'hardCode',
      headerName: 'Hard Code',
      type: 'string',
      width: 180,
    },
    {
      field: 'value',
      headerName: 'Value',
      type: 'string',
      width: 180,
    },
    { field: 'active', headerName: 'Actived', type: 'boolean', width: 80 },
    { field: 'timestamp', headerName: 'Timestamp', type: 'string', width: 170 },
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
                setReference(params.row)
                router.push(`/maintenance/lookup-references/${params.row.id}`)
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
      setReference(null)
      setLookup(null)
      if (referenceListChanged) {
        try {
          const list = await getLookupReferenceList()
          setReferenceList(list)
        } catch (error) {
          toasState.setState({
            ...toasState,
            message: (error as Error).message,
            severity: 'error',
            visibility: true,
          })
          return
        }
      }
    })()
  }, [referenceListChanged])

  return (
    <>
      <Column>
        <Typography variant='h6'>Lookup References</Typography>
      </Column>
      <Row
        justifyContent='right'
        alignContent='center'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push('/maintenance/lookup-references/new')
          }}
        >
          <AddIcon />
        </Fab>
      </Row>
      <DataGrid
        rows={referenceList}
        columns={columns}
        editMode='row'
        pageSizeOptions={[10, 25, 50, 100]}
        onRowDoubleClick={(params) => {
          setReference(params.row)
          router.push(`/maintenance/lookup-references/${params.row.id}`)
        }}
      />
    </>
  )
}
