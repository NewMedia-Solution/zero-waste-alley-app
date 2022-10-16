import type * as States from './stateTypes'

export const SET_BUILDING_LIST = 'Modal/SET_BUILDING_LIST'

type SetBuildingListAction = {
  type: typeof SET_BUILDING_LIST
  payload: {
    buildingList: States.BuildingList
  }
}

export type AnyActionTypes = SetBuildingListAction

export type ISetBuildingList = (
  buildingList: States.BuildingListJson
) => SetBuildingListAction
