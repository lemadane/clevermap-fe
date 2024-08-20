'use client'
import { Breadcrumbs } from '@mui/material'
import useLookupState from '@/common/store/LookupState'
import Link from 'next/link'

export default function LookupReferencesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const reference = useLookupState((state) => state.reference)
  const lookup = useLookupState((state) => state.lookup)

  return (
    <>
      <Breadcrumbs>
        <Link
          href='/maintenance'
          style={{
            textDecoration: 'none',
          }}
        >
          Maintenance
        </Link>
        <Link
          href='/maintenance/lookup-references'
          style={{
            textDecoration: 'none',
          }}
        >
          Lookup References
        </Link>
        {!!reference ? (
          <Link
            href={`/maintenance/lookup-references/${reference.id}`}
            style={{
              textDecoration: 'none',
            }}
          >
            {`${reference.name}`}
          </Link>
        ) : (
          <Link
            href='/maintenance/lookup-references/new'
            style={{
              textDecoration: 'none',
            }}
          >
            Add New
          </Link>
        )}
        {!!reference && (
          <Link
            href={`/maintenance/lookup-references/${reference.id}/lookups`}
            style={{
              textDecoration: 'none',
            }}
          >
            Lookups
          </Link>
        )}
        {!!reference ? (
          !!lookup ? (
            <Link
              href={`/lookup-references/${reference.id}/lookups/${lookup.id}`}
              style={{
                textDecoration: 'none',
              }}
            >
              {`${lookup.name}`}
            </Link>
          ) : (
            <Link
              href={`/maintenance/lookup-references/${reference.id}/lookups/new`}
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
