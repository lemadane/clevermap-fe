'use client'
import { Column, Row } from '@/common/components/WmLayoutModes'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSearchIcon,
} from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import useAccountState from '@/common/store/AccountsState'
import { getAccountList } from '@/common/api/accounts'
import usePageControl from '@/common/store/PageControl'
import { useRouter } from 'next/navigation'

export default function People() {
  const accountState = useAccountState((state) => state)
  const pageControl = usePageControl((state) => state)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'string',
      width: 60,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'fullName',
      headerName: 'Name',
      type: 'string',
      width: 280,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'currentAge',
      headerName: 'Age',
      type: 'number',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'string',
      width: 640,
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 100,
      headerAlign: 'center',
      align: 'right',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Column
            alignItems='center'
            justifyContent='center'
          >
            <IconButton
              onClick={() => {
                accountState.setSelected(params.row)
                router.push(`/people/${params.row.id}`)
              }}
            >
              <EditIcon color='primary' />
            </IconButton>
          </Column>
        )
      },
    },
  ]

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await getAccountList(
        pageControl.offset,
        pageControl.size,
        search
      )
      accountState.setList(data)
    }
    fetchPeople()
  }, [accountState.listChanged])

  return (
    <Column
      justifyContent='center'
      alignItems='center'
      width='99vw'
      height='auto'
    >
      <Column>
        <Row
          direction='row'
          flexDirection='row'
          justifyContent='space-between'
          alignContent='center'
          width='inherit'
        >
          <Typography
            variant='h5'
            fontWeight='bold'
          >
            People
          </Typography>
          <Button
            variant='outlined'
            onClick={() => router.push('/people/new')}
          >
            Add
          </Button>
        </Row>
        <Row
          justifyContent='space-between'
          alignItems='center'
          margin='10px'
        >
          <FormControl
            variant='outlined'
            size='small'
            sx={{
              width: '160px',
            }}
          >
            <InputLabel>Show Entries</InputLabel>
            <Select
              label='Show Entries'
              value={pageControl.size}
              onChange={(e) => {
                e.preventDefault()
                pageControl.setSize(Number(e.target.value))
                accountState.toggleListChanged()
              }}
              onBlur={(e) => {
                e.preventDefault()
              }}
            >
              {pageControl.sizeOptions.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Search'
            variant='outlined'
            size='small'
            value={search}
            sx={{ width: '400px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <GridSearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
              accountState.toggleListChanged()
            }}
          />
        </Row>
        <DataGrid
          // sx={{
          //   width: '1280px',
          // }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                //id: false,
              },
            },
          }}
          rows={accountState.list}
          columns={columns}
          pageSizeOptions={[5, 10, 20, { value: 100, label: 'All' }]}
          onRowDoubleClick={(params) => {
            accountState.setSelected(params.row)
            router.push(`/people/${params.row.id}`)
          }}
        />
      </Column>
    </Column>
  )
}
