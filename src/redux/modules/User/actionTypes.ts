export const SET_IS_LOGIN = 'User/SET_IS_LOGIN'
export const SET_USER_INFO = 'User/SET_USER_INFO'

type SetIsLoginAction = {
  type: typeof SET_IS_LOGIN
  payload: {
    isLogin: boolean
  }
}

type SetUserInfoAction = {
  type: typeof SET_USER_INFO
  payload: {
    id: string
    name: string
  }
}

export type AnyActionTypes = SetIsLoginAction | SetUserInfoAction

export type ISetIsLogin = (isLogin: boolean) => SetIsLoginAction

export type ISetUserInfo = () => SetUserInfoAction
