'use client'
import { Breadcrumbs } from '@mui/material'
import useProvinceState from '@/common/store/ProvinceState'
import Link from 'next/link'

export default function LookupReferencesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const province = useProvinceState((state) => state.province)
  const city = useProvinceState((state) => state.city)
  const locality = useProvinceState((state) => state.locality)

  return (
    <>
      <Breadcrumbs sx={{ paddingY: '20px' }}>
        <Link
          href='/maintenance'
          style={{
            textDecoration: 'none',
          }}
        >
          Maintenance
        </Link>
        <Link
          href='/maintenance/provinces'
          style={{
            textDecoration: 'none',
          }}
        >
          Provinces
        </Link>
        {!!province ? (
          <Link
            href={`/maintenance/provinces/${province.id}`}
            style={{
              textDecoration: 'none',
            }}
          >
            {`${province.name}`}
          </Link>
        ) : (
          <Link
            href='/maintenance/provinces/new'
            style={{
              textDecoration: 'none',
            }}
          >
            Add New
          </Link>
        )}
        {!!province && (
          <Link
            href={`/maintenance/provinces/${province.id}/cities`}
            style={{
              textDecoration: 'none',
            }}
          >
            Cities
          </Link>
        )}
        {!!province ? (
          !!city ? (
            <Link
              href={`/maintenance/provinces/${province.id}/cities/${city.id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              {`${city.name}`}
            </Link>
          ) : (
            <Link
              href={`/maintenance/provinces/${province.id}/cities/new`}
              style={{
                textDecoration: 'none',
              }}
            >
              Add New
            </Link>
          )
        ) : null}
        {!!province && !!city && (
          <Link
            href={`/maintenance/provinces/${province.id}/cities/${city.id}/localities`}
            style={{
              textDecoration: 'none',
            }}
          >
            Localities
          </Link>
        )}
        {!!province && !!city ? (
          !!locality ? (
            <Link
              href={`/maintenance/provinces/${province.id}/cities/${city.id}/localities/${locality.id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              {`${locality.name}`}
            </Link>
          ) : (
            <Link
              href={`/maintenance/provinces/${province.id}/cities/${city.id}/localities/new`}
              style={{
                textDecoration: 'none',
              }}
            >
              Add New
            </Link>
          )
        ) : null}
      </Breadcrumbs>
      {children}
    </>
  )
}
