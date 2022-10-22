import * as States from './stateTypes'
import * as Actions from './actionTypes'
import type * as Types from './types'
import ApiHelper from '../../../helpers/ApiHelper'
import { Alert } from 'react-native'
import {
  removeStorageData,
  saveToStorage,
} from '../../../services/AsyncStorageService'

export const setIsLogin: Actions.ISetIsLogin = (isLogin) => ({
  type: Actions.SET_IS_LOGIN,
  payload: {
    isLogin: isLogin,
  },
})

export const setId: Actions.ISetId = (id) => ({
  type: Actions.SET_ID,
  payload: {
    id: id,
  },
})

export const setUserInfo: Actions.ISetUserInfo = (userInfo) => ({
  type: Actions.SET_USER_INFO,
  payload: {
    id: userInfo.id,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNum,
    email: userInfo.email,
    address: userInfo.address1,
    zoneCode: userInfo.zipCode,
    detailAddress: userInfo.address2,
    unit: userInfo.roomNum,
    isAdmin: userInfo.adminYn === 'Y',
  },
})

const initialState: States.AllStates = {
  isLogin: false,
  id: null,
  name: null,
  phoneNumber: null,
  email: null,
  address: null,
  zoneCode: null,
  detailAddress: null,
  unit: null,
  isAdmin: false,
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_LOGIN:
      return { ...state, isLogin: action.payload.isLogin }
    case Actions.SET_ID:
      return { ...state, id: action.payload.id }
    case Actions.SET_USER_INFO:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        address: action.payload.address,
        zoneCode: action.payload.zoneCode,
        detailAddress: action.payload.detailAddress,
        unit: action.payload.unit,
        isAdmin: action.payload.isAdmin,
      }
    default:
      return state
  }
}

export default reducer

export const logout: Types.ILogout = () => async (dispatch) => {
  dispatch(setIsLogin(false))
  dispatch(
    setUserInfo({
      id: null,
      name: null,
      phoneNum: null,
      email: null,
      address1: null,
      address2: null,
      zipCode: null,
      roomNum: null,
      adminYn: 'N',
    })
  )

  removeStorageData('id')
}

export const checkId: Types.ICheckId = (id) => async () => {
  try {
    const path = '/api/user/checkId'
    const body = JSON.stringify({
      id: id,
    })

    const { response, json } = await ApiHelper.post(path, body)

    const result: Types.CheckIdReturnType = {
      isApiSuccess: response.ok,
    }

    if (response.ok) {
      result.state = json.state
      result.message = json.message

      return result
    } else {
      Alert.alert('', '서버 연결에 실패했습니다.')

      return result
    }
  } catch (error: any) {
    Alert.alert('', error.toString())

    return {
      isApiSuccess: false,
    }
  }
}

export const signUp: Types.ISignUp = (userInfo) => async () => {
  try {
    const path = '/api/user/register'
    const body = JSON.stringify(userInfo)

    const { response, json } = await ApiHelper.post(path, body)

    const result: Types.SignUpReturnType = {
      isApiSuccess: response.ok,
    }

    if (response.ok) {
      result.state = json.state
      result.message = json.message

      return result
    } else {
      Alert.alert('', '서버 연결에 실패했습니다.')

      return result
    }
  } catch (error: any) {
    Alert.alert('', error.toString())

    return {
      isApiSuccess: false,
    }
  }
}

export const login: Types.ILogin = (id, password) => async (dispatch) => {
  try {
    const path = '/api/user/login'
    const body = JSON.stringify({
      id: id,
      password: password,
    })

    const { response, json } = await ApiHelper.post(path, body)

    const result: Types.LoginReturnType = {
      isApiSuccess: response.ok,
    }

    if (response.ok) {
      result.state = json.state
      result.message = json.message

      dispatch(setId(id))
      await saveToStorage('id', id)

      return result
    } else {
      Alert.alert('', '서버 연결에 실패했습니다.')

      return result
    }
  } catch (error: any) {
    Alert.alert('', error.toString())

    return {
      isApiSuccess: false,
    }
  }
}

export const getUserInfo: Types.IGetUserInfo = (id) => async (dispatch) => {
  try {
    const path = '/api/user/loadInfo'
    const body = JSON.stringify({
      id: id,
    })

    const { response, json } = await ApiHelper.post(path, body)

    const result: Types.GetUserInfoType = {
      isApiSuccess: response.ok,
    }

    if (response.ok) {
      dispatch(setUserInfo(json as States.UserInfoJson))

      return result
    } else {
      Alert.alert('', '서버 연결에 실패했습니다.')

      return result
    }
  } catch (error: any) {
    Alert.alert('', error.toString())

    return {
      isApiSuccess: false,
    }
  }
}

export const updateUserInfo: Types.IUpdateUserInfo = (userInfo) => async () => {
  try {
    const path = '/api/user/editInfo'
    const body = JSON.stringify(userInfo)

    const { response, json } = await ApiHelper.post(path, body)

    const result: Types.UpdateUserInfoType = {
      isApiSuccess: response.ok,
    }

    if (response.ok) {
      result.state = json.state
      result.message = json.message

      return result
    } else {
      Alert.alert('', '서버 연결에 실패했습니다.')

      return result
    }
  } catch (error: any) {
    Alert.alert('', error.toString())

    return {
      isApiSuccess: false,
    }
  }
}
