'use client';
import WmCheckbox from '@/common/components/WmCheckbox';
import { Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useToastState from '@/common/store/WmToastState';
import { create, update } from '@/common/api/entities';
import useWmEntityState from '@/common/store/WmEntityState';
import { Column, Row } from './WmLayoutModes';

export type Props = Readonly<{
  entityName: string;
  displayName: string;
  id: string;
}>;

export default function WmAdminEntity(props: Props) {
  const [isNew] = useState<boolean>(props.id === 'new');
  const { setEntity, entity, setListChanged } = useWmEntityState(
    (state) => state
  );
  const router = useRouter();

  const toasState = useToastState((state) => state);

  useEffect(() => {
    if (isNew) {
      setEntity(null);
    }
  }, []);

  const backToListPage = () => {
    router.push(`/maintenance/${props.entityName}`);
  };

  const handleSave = async () => {
    try {
      if (isNew) {
        //eslint-disable-next-line
        var result = await create(props.entityName, entity!);
      } else {
        //eslint-disable-next-line
        var result = await update(props.entityName, entity!);
      }
      toasState.setState({
        ...toasState,
        message: result.Message,
        severity: result.IsSuccess ? 'success' : 'error',
        visibility: true,
      });
      setListChanged(true);
      backToListPage();
    } catch (error) {
      toasState.setState({
        ...toasState,
        message: (error as Error).message,
        severity: 'error',
        visibility: true,
      });
      backToListPage();
    }
  };

  return (
    <>
      <Column>
        <Typography variant='h6'>
          {isNew ? `Add New ${props.displayName}` : `Update ${entity?.name}`}
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
            value={entity?.name}
            onChange={(e) =>
              setEntity({
                ...entity!,
                name: e.target.value,
              })
            }
          />
          <TextField
            label='Hard Code'
            value={entity?.hardCode}
            onChange={(e) =>
              setEntity({
                ...entity!,
                hardCode: e.target.value,
              })
            }
          />
          <WmCheckbox
            label='Activated'
            checked={entity?.active as boolean}
            onChange={(e) =>
              setEntity({
                ...entity!,
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
              onClick={backToListPage}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  );
}
