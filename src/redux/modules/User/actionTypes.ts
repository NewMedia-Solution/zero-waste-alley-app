export const SET_USER_INFO = 'User/SET_USER_INFO'

type SetUserInfoAction = {
  type: typeof SET_USER_INFO
  payload: {
    id: string
    name: string
  }
}

export type AnyActionTypes = SetUserInfoAction

export type ISetUserInfo = () => SetUserInfoAction
