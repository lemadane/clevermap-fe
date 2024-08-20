'use client'
import { Fab, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Lookup } from '@/common/types'
import { useEffect, useState } from 'react'
import { getLookupList } from '@/common/api/lookups'
import useLookupState from '@/common/store/LookupState'
import { useRouter } from 'next/navigation'
import { Column, Row } from '@/common/components/WmLayoutModes'

export type Props = Readonly<{
  params: {
    referenceId: string;
  };
}>;

export default function LookupListPage(props: Props) {
  const { referenceId } = props.params
  const [lookupList, setLookupList] = useState<Lookup[]>([])
  const { setLookup, lookupListChanged } = useLookupState((state) => state)
  
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'referenceId',
      headerName: 'Ref ID',
      type: 'number',
      width: 60,
    },
    { field: 'id', headerName: 'ID', type: 'number', width: 60 },
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
    { field: 'active', headerName: 'Activated', type: 'boolean', width: 80 },
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
      headerName: 'Udpate',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Row spacing={1}>
            <IconButton
              onClick={() => {
                setLookup(params.row)
                router.push(
                  `/maintenance/lookup-references/${referenceId}/lookups/${params.row.id}`
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
      setLookup(null)
      if (lookupListChanged) {
        const list = await getLookupList(referenceId)
        setLookupList(list)
      }
    })()
  }, [lookupListChanged, referenceId])

  return (
    <>
      <Column>
        <Typography variant='h6'>Lookups</Typography>
      </Column>
      <Column
        justifyContent='right'
        alignContent='center'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push(
              `/maintenance/lookup-references/${referenceId}/lookups/new`
            )
          }}
        >
          <AddIcon />
        </Fab>
      </Column>
      <DataGrid
        rows={lookupList}
        columns={columns}
        editMode='row'
        pageSizeOptions={[10, 25, 50, 100]}
        onRowDoubleClick={(params) => {
          setLookup(params.row)
          router.push(
            `/maintenance/lookup-references/${referenceId}/lookups/${params.row.id}`
          )
        }}
      />
    </>
  )
}
