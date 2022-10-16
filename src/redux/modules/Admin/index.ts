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

const initialState: States.AllStates = {
  buildingList: [],
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_BUILDING_LIST:
      return { ...state, buildingList: action.payload.buildingList }
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

export default reducer
