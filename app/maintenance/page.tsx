'use client'
import { Column } from '@/common/components/WmLayoutModes'
import { MAINTENANCE_PATH } from '@/common/constants'
import { Button, Link } from '@mui/material'

export default function Maintenance() {
  return (
    <>
      <Column
        justifyContent='center'
        alignItems='center'
        width='inherit'
        height='60vh'
        spacing={2}
      >
        <Link href={`/maintenance/${MAINTENANCE_PATH.LOOKUP_REFERENCES}`}>
          <Button variant='text'>Lookup References</Button>
        </Link>
        <Link href={`/maintenance/${MAINTENANCE_PATH.MODULES}`}>
          <Button variant='text'>Modules</Button>
        </Link>
        <Link href={`/maintenance/${MAINTENANCE_PATH.PROVINCES}`}>
          <Button variant='text'>Provinces</Button>
        </Link>
        <Link href={`/maintenance/${MAINTENANCE_PATH.USER_GROUPS}`}>
          <Button variant='text'>User Groups</Button>
        </Link>
        <Link href={`/maintenance/${MAINTENANCE_PATH.USER_PERMISSIONS}`}>
          <Button variant='text'>User Permissions</Button>
        </Link>
      </Column>
    </>
  )
}
