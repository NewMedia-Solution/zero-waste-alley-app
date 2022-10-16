import * as States from './stateTypes'
import * as Actions from './actionTypes'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../ReduxModuleTypes'

export type IReducer = (
  state: States.AllStates,
  action: Actions.AnyActionTypes
) => States.AllStates

export type RequestBuildingListReturnType = {
  isApiSuccess: boolean
}

export type IRequestBuildingList = () => ThunkAction<
  Promise<RequestBuildingListReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>
