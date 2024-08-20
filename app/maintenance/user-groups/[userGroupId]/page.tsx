'use client'
import WmAdminEntity from '@/common/components/WmAdminEntity'
import { MAINTENANCE_PATH } from '@/common/constants'

export type Props = Readonly<{
  params: {
    userGroupId: string;
  };
}>;

export default function Page(props: Props) {
  return (
    <WmAdminEntity
      entityName={MAINTENANCE_PATH.USER_GROUPS}
      displayName='User Group'
      id={props.params.userGroupId}
    />
  )
}
