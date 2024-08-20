'use client'
import WmAdminLayout from '@/common/components/WmAdminLayout'
import { MAINTENANCE_PATH } from '@/common/constants'

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout(props: Props) {
  return (
    <WmAdminLayout
      entityName={MAINTENANCE_PATH.MODULES}
      displayName='Modules'
    >
      {props.children}
    </WmAdminLayout>
  )
}
