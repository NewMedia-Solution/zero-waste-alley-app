import type * as States from './stateTypes'

export const SET_BUILDING_LIST = 'Modal/SET_BUILDING_LIST'
export const SET_RESIDENT_LIST = 'Modal/SET_RESIDENT_LIST'

type SetBuildingListAction = {
  type: typeof SET_BUILDING_LIST
  payload: {
    buildingList: States.BuildingList
  }
}

type SetResidentListAction = {
  type: typeof SET_RESIDENT_LIST
  payload: {
    residentList: States.ResidentList
  }
}

export type AnyActionTypes = SetBuildingListAction | SetResidentListAction

export type ISetBuildingList = (
  buildingList: States.BuildingListJson
) => SetBuildingListAction

export type ISetResidentList = (
  residentList: States.ResidentListJson
) => SetResidentListAction
