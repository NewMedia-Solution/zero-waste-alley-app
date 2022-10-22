import * as States from './stateTypes'
import * as Actions from './actionTypes'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../ReduxModuleTypes'

export type IReducer = (
  state: States.AllStates,
  action: Actions.AnyActionTypes
) => States.AllStates

export type ILogout = () => ThunkAction<
  void,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type CheckIdReturnType = {
  isApiSuccess: boolean
  state?: boolean
  message?: string
}

export type ICheckId = (
  id: string
) => ThunkAction<
  Promise<CheckIdReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type SignUpReturnType = {
  isApiSuccess: boolean
  state?: boolean
  message?: string
}

export type ISignUp = (userInfo: {
  id: string
  password: string
  name: string
  email: string
  phoneNum: string
  zipCode: string
  address1: string
  address2: string
  roomNum: string
}) => ThunkAction<
  Promise<SignUpReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type LoginReturnType = {
  isApiSuccess: boolean
  state?: boolean
  message?: string
}

export type ILogin = (
  id: string,
  password: string
) => ThunkAction<
  Promise<LoginReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type GetUserInfoType = {
  isApiSuccess: boolean
}

export type IGetUserInfo = (
  id: string
) => ThunkAction<
  Promise<GetUserInfoType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type UpdateUserInfoType = {
  isApiSuccess: boolean
  state?: boolean
  message?: string
}

export type IUpdateUserInfo = (userInfo: {
  id: string
  password: string
  name: string
  email: string
  phoneNum: string
  zipCode: string
  address1: string
  address2: string
  roomNum: string
}) => ThunkAction<
  Promise<UpdateUserInfoType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type CheckQrCodeType = {
  isApiSuccess: boolean
  state?: boolean
}

export type ICheckQrCode = (
  qrCodeId: string
) => ThunkAction<
  Promise<CheckQrCodeType>,
  AppState,
  null,
  Actions.AnyActionTypes
>
