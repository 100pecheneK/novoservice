import React from 'react'
import HomePage from '@containers/pages/HomePage'
import { NextPageContext } from 'next'
import { papa, photo, settings } from 'config/config'

export type SiteInfoType = {
  _documentName: string
  title: string
  _link: string
  subtitle: string
  logoAlt: string
  logo:  string
}[]

export type SettingsType = {
  welcomeTitle: string
}

export type HomeProps = {
  data: { siteInfo: SiteInfoType; settings: SettingsType }
}

export default function Home({ data }: HomeProps) {
  const { siteInfo, settings } = data

  return <HomePage siteInfo={siteInfo} settings={settings} />
}

export const getServerSideProps = (cts: NextPageContext) => {
  return {
    props: {
      data: {
        siteInfo: [
          papa,
          photo
        ],
        settings: settings,
      },
    },
  }
}
