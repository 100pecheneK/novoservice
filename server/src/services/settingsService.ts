import Settings, { ISettings } from '@models/Settings'

export const getSettings = async () => {
  const settings = await Settings.findOne()
  if (!settings) throw new Error('Settings not created yet')

  return settings
}

export const createSettings = async (settingsProps: ISettings) => {
  const settings = await Settings.countDocuments()
  if (settings) throw new Error('Settings allready exists')
  return await Settings.create(settingsProps)
}

export const updateSettings = async (settingsProps: ISettings) => {
  const settings = await Settings.countDocuments()
  if (!settings) throw new Error('Settings not created yet')
  await Settings.updateOne(settingsProps)
  return await getSettings()
}
export const deleteSettings = async () => await Settings.deleteOne()
