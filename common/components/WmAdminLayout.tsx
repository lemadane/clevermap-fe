'use client';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import useWmEntityState from '@/common/store/WmEntityState';

type Props = Readonly<{
  children: React.ReactNode;
  entityName: string;
  displayName: string;
}>;

export default function WmAdminLayout(props: Props) {
  const entity = useWmEntityState((state) => state.entity);

  return (
    <>
      <Breadcrumbs sx={{ padding: '20px' }}>
        <Link
          href='/maintenance'
          style={{
            textDecoration: 'none',
          }}
        >
          Maintenance
        </Link>
        <Link
          href={`/maintenance/${props.entityName}`}
          style={{
            textDecoration: 'none',
          }}
        >
          {props.displayName}
        </Link>
        {!!entity ? (
          <Link
            href={`/maintenance/${props.entityName}/${entity.id}`}
            style={{
              textDecoration: 'none',
            }}
          >
            {`${entity.name}`}
          </Link>
        ) : (
          <Link
            href={`/maintenance/${props.entityName}/new`}
            style={{
              textDecoration: 'none',
            }}
          >
            Add New
          </Link>
        )}
      </Breadcrumbs>
      {props.children}
    </>
  );
}
