'use client'
import WmAdminEntity from '@/common/components/WmAdminEntity'
import { MAINTENANCE_PATH } from '@/common/constants'

export type Props = Readonly<{
  params: {
    userPermissionId: string;
  };
}>;

export default function Page(props: Props) {
  return (
    <WmAdminEntity
      entityName={MAINTENANCE_PATH.USER_PERMISSIONS}
      displayName='User Permission'
      id={props.params.userPermissionId}
    />
  )
}
