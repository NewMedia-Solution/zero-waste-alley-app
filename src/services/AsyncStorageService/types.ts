import { ThunkAction } from 'redux-thunk'
import { AppState } from '../../redux/modules/ReduxModuleTypes'
import * as Actions from '../../redux/modules/User/actionTypes'

export type IInitStorageData = () => ThunkAction<
  Promise<void>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type ISaveToStorage = (key: string, value: any) => Promise<void>

export type IRemoveStorageData = (key: string) => Promise<void>
