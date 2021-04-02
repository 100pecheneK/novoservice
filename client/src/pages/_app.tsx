import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import React from 'react'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
