import Timetable, { ITimetable } from '@models/Timetable'

export const createTimetable = async (timetableArgs: ITimetable) => {
  const timetable = await Timetable.countDocuments({
    _shopName: timetableArgs._shopName,
  })
  if (timetable) throw new Error('Timetable allready exists')
  return await Timetable.create(timetableArgs)
}

export const getTimetableByShopName = async (
  _shopName: ITimetable['_shopName']
) => {
  const timetable = await Timetable.findOne({ _shopName })
  if (!timetable) throw new Error('Timetable is not creatd yet')
  return timetable
}

export const deleteTimetableByShopName = async (
  _shopName: ITimetable['_shopName']
) => await Timetable.deleteOne({ _shopName })

export const updateTimetableByShopName = async (timetableArgs: ITimetable) => {
  const timetable = await Timetable.countDocuments({
    _shopName: timetableArgs._shopName,
  })
  if (!timetable) throw new Error('Timetable is not created yet')
  await Timetable.findOneAndUpdate(
    { _shopName: timetableArgs._shopName },
    timetableArgs
  )
  return await getTimetableByShopName(timetableArgs._shopName)
}
