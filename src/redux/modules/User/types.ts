import * as States from './stateTypes'
import * as Actions from './actionTypes'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../ReduxModuleTypes'

export type IReducer = (
  state: States.AllStates,
  action: Actions.AnyActionTypes
) => States.AllStates

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
