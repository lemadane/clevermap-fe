'use client'
import { Column, Row } from '@/common/components/WmLayoutModes'
import { Card } from '@mui/material'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <>
      <Column
        justifyContent='center'
        alignItems='center'
        margin='20px'
      >
        <Card
          sx={{
            width: '1188px',
            height: '612',
            borderRadius: '10px',
            margin: '10px 10px 10px 10px',
          }}
        >
          <Row
            justifyContent='center'
            alignItems='center'
          >
            <Image
              width={1188}
              height={612}
              src='/demo_dashboard.png'
              alt='demo_dashboard.png'
            />
          </Row>
        </Card>
      </Column>
    </>
  )
}
