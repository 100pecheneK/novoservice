import Page from '@containers/pages/Page'
import { papa } from 'config/config'
import { NextPageContext } from 'next'
import React from 'react'
import { PageDataType } from 'selectors/selectors'

export default function Papa({ data }: { data: PageDataType }) {
  return <Page data={data} />
}

export const getServerSideProps = (ctx: NextPageContext) => {
  return {
    props: {
      data: papa,
    },
  }
}
