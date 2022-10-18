import * as States from './stateTypes'
import * as Actions from './actionTypes'
import type * as Types from './types'
import ApiHelper from '../../../helpers/ApiHelper'
import { Alert } from 'react-native'

export const setBuildingList: Actions.ISetBuildingList = (buildingList) => {
  const newBuildingList = buildingList.map((buildingInfo) => {
    return {
      address: buildingInfo.address1,
      detailAddress: buildingInfo.address2,
      buildingId: buildingInfo.building_id,
    }
  })

  return {
    type: Actions.SET_BUILDING_LIST,
    payload: {
      buildingList: newBuildingList,
    },
  }
}

export const setResidentList: Actions.ISetResidentList = (residentList) => {
  const newResidentList = residentList.map((residentInfo) => {
    return {
      residentId: residentInfo.member_id,
      approvalState: residentInfo.approval_state,
      roomNumber: residentInfo.room_num,
    }
  })

  return {
    type: Actions.SET_RESIDENT_LIST,
    payload: {
      residentList: newResidentList,
    },
  }
}

const initialState: States.AllStates = {
  buildingList: [],
  residentList: [],
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_BUILDING_LIST:
      return { ...state, buildingList: action.payload.buildingList }
    case Actions.SET_RESIDENT_LIST:
      return { ...state, residentList: action.payload.residentList }
    default:
      return state
  }
}

export const requestBuildingList: Types.IRequestBuildingList =
  () => async (dispatch, getState) => {
    try {
      const id = getState().User.id

      const path = '/buildAdmin/buildingList'
      const body = JSON.stringify({
        admin_id: id,
      })

      const { response, json } = await ApiHelper.post(path, body)

      const result: Types.RequestBuildingListReturnType = {
        isApiSuccess: response.ok,
      }

      if (response.ok) {
        dispatch(setBuildingList(json.data))

        return result
      } else {
        Alert.alert('', '서버 연결에 실패했습니다.')

        return result
      }
    } catch (error: any) {
      Alert.alert('', error.toString())

      return {
        isApiSuccess: false,
      }
    }
  }

export const requestResidentList: Types.IRequestResidentList =
  (buildingId) => async (dispatch) => {
    try {
      const path = '/buildAdmin/residentList'
      const body = JSON.stringify({
        building_id: buildingId,
      })

      const { response, json } = await ApiHelper.post(path, body)

      const result: Types.RequestResidentListReturnType = {
        isApiSuccess: response.ok,
      }

      if (response.ok) {
        dispatch(setResidentList(json.data))

        return result
      } else {
        Alert.alert('', '서버 연결에 실패했습니다.')

        return result
      }
    } catch (error: any) {
      Alert.alert('', error.toString())

      return {
        isApiSuccess: false,
      }
    }
  }

export const updateResident: Types.IUpdateResident =
  (approvalState, residentId, buildingId) => async () => {
    try {
      const path = '/buildAdmin/updateApState'
      const body = JSON.stringify({
        approval_state: approvalState,
        member_id: residentId,
        building_id: buildingId,
      })

      const { response } = await ApiHelper.post(path, body)

      const result: Types.UpdateResidentReturnType = {
        isApiSuccess: response.ok,
      }

      if (response.ok) {
        return result
      } else {
        Alert.alert('', '서버 연결에 실패했습니다.')

        return result
      }
    } catch (error: any) {
      Alert.alert('', error.toString())

      return {
        isApiSuccess: false,
      }
    }
  }

export default reducer
