import * as Types from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setId } from '../../redux/modules/User'

export const initStorageData: Types.IInitStorageData =
  () => async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('id')

      if (value !== null) {
        dispatch(setId(JSON.parse(value)))
      }
    } catch (error) {
      // error 대응
    }
  }

export const saveToStorage: Types.ISaveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // error 대응
  }
}

export const removeStorageData: Types.IRemoveStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // error 대응
  }
}
