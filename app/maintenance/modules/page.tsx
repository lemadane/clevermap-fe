import WmEntityList from '@/common/components/WmEntityList'
import { MAINTENANCE_PATH } from '@/common/constants'

export default function Page() {
  return (
    <WmEntityList
      entityName={MAINTENANCE_PATH.MODULES}
      displayName='Modules'
    />
  )
}
