import React from 'react'
import PageLayout from '@components/PageLayout'
import selectors from '@selectors'
import { PageDataType } from 'selectors/selectors'
import MainSection from '@containers/sections/MainSection'

export default function PhotoPage({ data }: { data: PageDataType }) {
  const mainData = selectors.mainData(data)
  return (
    <PageLayout>
      <MainSection mainData={mainData} />
    </PageLayout>
  )
}
