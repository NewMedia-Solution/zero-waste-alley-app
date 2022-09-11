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

export const setUserInfo: Actions.ISetUserInfo = () => ({
  type: Actions.SET_USER_INFO,
  payload: {
    id: '',
    name: '',
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
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_LOGIN:
      return { ...state, isLogin: action.payload.isLogin }
    case Actions.SET_USER_INFO:
      return { ...state, id: action.payload.id, name: action.payload.name }
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
