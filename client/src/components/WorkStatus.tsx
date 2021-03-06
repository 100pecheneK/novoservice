import getWorkStatus from '@utils/getWorkStatus'
import React, { useRef } from 'react'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({ timetable }: {timetable: TimeTableType}) {
  const workStatus = useRef(getWorkStatus(timetable))

  return (
    <>
      <b
        className={`mr-2 ${
          workStatus.current.isOpen ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {workStatus.current.isOpen ? 'Открыто' : 'Закрыто'}
      </b>
      {workStatus.current.isOpen ? 'Закроется' : 'Откроется завтра'} в&nbsp;
      {workStatus.current.work}
    </>
  )
}
