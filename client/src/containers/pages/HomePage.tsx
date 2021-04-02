import H1 from '@components/H1'
import MotionCard from '@components/MotionCard'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/Link'
import { SettingsType, SiteInfoType } from 'pages'
import React from 'react'

export type HomePageProps = {
  siteInfo: SiteInfoType
  settings: SettingsType
}

export default function HomePage({ siteInfo, settings }: HomePageProps) {
  return (
    <div className='container h-screen grid place-items-center'>
      <div className='flex flex-col'>
        <H1 text={settings.welcomeTitle} />
        <div className='xl:flex justify-center'>
          {siteInfo.map(({ _link, _documentName, ...cardData }) => (
            <AnimatePresence key={_documentName}>
              <Link href={_link}>
                <a>
                  <MotionCard layoutId={_link} {...cardData} />
                </a>
              </Link>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  )
}
