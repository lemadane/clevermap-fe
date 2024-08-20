'use client'
import WmAdminEntity from '@/common/components/WmAdminEntity'
import { MAINTENANCE_PATH } from '@/common/constants'

export type Props = Readonly<{
  params: {
    moduleId: string;
  };
}>;

export default function Page(props: Props) {
  return (
    <WmAdminEntity
      entityName={MAINTENANCE_PATH.MODULES}
      displayName='Module'
      id={props.params.moduleId}
    />
  )
}
