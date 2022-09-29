import type * as States from './stateTypes'

export const SET_IS_LOGIN = 'User/SET_IS_LOGIN'
export const SET_ID = 'User/SET_ID'
export const SET_USER_INFO = 'User/SET_USER_INFO'

type SetIsLoginAction = {
  type: typeof SET_IS_LOGIN
  payload: {
    isLogin: boolean
  }
}

type SetIdAction = {
  type: typeof SET_ID
  payload: {
    id: string
  }
}

type SetUserInfoAction = {
  type: typeof SET_USER_INFO
  payload: States.UserInfo
}

export type AnyActionTypes = SetIsLoginAction | SetIdAction | SetUserInfoAction

export type ISetIsLogin = (isLogin: boolean) => SetIsLoginAction

export type ISetId = (id: string) => SetIdAction

export type ISetUserInfo = (userInfo: States.UserInfoJson) => SetUserInfoAction
