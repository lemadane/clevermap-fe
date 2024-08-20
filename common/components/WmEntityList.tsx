'use client';
import { Fab, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AdminEntity } from '@/common/types';
import { useEffect, useState } from 'react';
import { getList } from '@/common/api/entities';
import useWmEntityState from '@/common/store/WmEntityState';
import { useRouter } from 'next/navigation';
import useWmToastState from '@/common/store/WmToastState';
import { Column, Row } from './WmLayoutModes';

type Props = Readonly<{
  entityName: string;
  displayName: string;
}>;

export default function WmEntityList(props: Props) {
  const [list, setList] = useState<AdminEntity[]>([]);
  const { setEntity, listChanged } = useWmEntityState((state) => state);
  const toastState = useWmToastState((state) => state);
  const router = useRouter();

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
      headerAlign: 'center',
    },
    {
      field: 'hardCode',
      headerName: 'Hard Code',
      type: 'string',
      width: 180,
      headerAlign: 'center',
    },
    { field: 'active', headerName: 'Activated', type: 'boolean', width: 80 },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'string',
      width: 210,
      headerAlign: 'center',
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      type: 'string',
      width: 180,
      headerAlign: 'center',
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      type: 'string',
      width: 210,
      headerAlign: 'center',
    },
    {
      field: 'userId',
      headerName: 'User ID',
      type: 'string',
      width: 180,
      headerAlign: 'center',
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Row spacing={1}>
            <IconButton
              onClick={() => {
                setEntity(params.row);
                router.push(
                  `/maintenance/${props.entityName}/${params.row.id}`
                );
              }}
            >
              <EditIcon color='primary' />
            </IconButton>
          </Row>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      setEntity(null);
      if (listChanged) {
        try {
          const list = await getList(props.entityName);
          setList(list);
        } catch (error) {
          toastState.setState({
            ...toastState,
            message: (error as Error).message,
            severity: 'error',
            visibility: true,
          });
          return;
        }
      }
    })();
  }, [listChanged]);

  return (
    <>
      <Column>
        <Typography variant='h6'>{props.displayName}</Typography>
      </Column>
      <Row
        justifyContent='right'
        alignItems='right'
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push(`/maintenance/${props.entityName}/new`);
          }}
        >
          <AddIcon />
        </Fab>
      </Row>
      <Row justifyContent='center'>
        {list.length ? (
          <DataGrid
            rows={list}
            columns={columns}
            // editMode='row'
            pageSizeOptions={[10, 25, 50, 100]}
            onRowDoubleClick={(params) => {
              setEntity(params.row);
              router.push(`/maintenance/${props.entityName}/${params.row.id}`);
            }}
          />
        ) : (
          <Typography variant='h6'>No data found</Typography>
        )}
      </Row>
    </>
  );
}
