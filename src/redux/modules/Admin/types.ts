import * as States from './stateTypes'
import * as Actions from './actionTypes'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../ReduxModuleTypes'
import { RESIDENT_APPROVAL_STATE } from '../../../Enums'

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

export type RequestResidentListReturnType = {
  isApiSuccess: boolean
}

export type IRequestResidentList = (
  buildingId: string
) => ThunkAction<
  Promise<RequestResidentListReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>

export type UpdateResidentReturnType = {
  isApiSuccess: boolean
}

export type IUpdateResident = (
  approvalState: RESIDENT_APPROVAL_STATE,
  residentId: string,
  buildingId: string
) => ThunkAction<
  Promise<UpdateResidentReturnType>,
  AppState,
  null,
  Actions.AnyActionTypes
>
