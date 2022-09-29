import * as States from './stateTypes'
import * as Actions from './actionTypes'
import type * as Types from './types'
import ApiHelper from '../../../helpers/ApiHelper'
import { Alert } from 'react-native'

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
    detailAddress: userInfo.address2,
    isAdmin: userInfo.adminYn,
  },
})

const initialState: States.AllStates = {
  isLogin: false,
  id: null,
  name: null,
  phoneNumber: null,
  email: null,
  address: null,
  detailAddress: null,
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
        detailAddress: action.payload.detailAddress,
        isAdmin: action.payload.isAdmin,
      }
    default:
      return state
  }
}

export default reducer

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

export const login: Types.ILogin = (id, password) => async () => {
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
