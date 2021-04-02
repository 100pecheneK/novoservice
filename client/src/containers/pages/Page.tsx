import PageLayout from '@components/PageLayout'
import MainSection from '@containers/sections/MainSection'
import ServicesSection from '@containers/sections/ServicesSection'
import selectors from '@selectors'
import React from 'react'
import { Element } from 'react-scroll'
import { PageDataType } from 'selectors/selectors'

export default function Page({ data }: { data: PageDataType }) {
  const mainData = selectors.mainData(data)
  const email = selectors.email(data)
  const phonenumber = selectors.phonenumber(data)
  const servicesData = selectors.servicesData(data)
  const servicesContacts = selectors.servicesContacts(data)

  return (
    <PageLayout>
      <MainSection mainData={mainData} />
      <ServicesSection
        servicesContacts={servicesContacts}
        servicesData={servicesData}
        contacts={{ email, phonenumber }}
      />
      <div className='h-screen'></div>
      <Element name='timetable'>фвфы</Element>
    </PageLayout>
  )
}
