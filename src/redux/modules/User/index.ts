import * as States from './stateTypes'
import * as Actions from './actionTypes'
import type * as Types from './types'

export const setUserInfo: Actions.ISetUserInfo = () => ({
  type: Actions.SET_USER_INFO,
  payload: {
    id: '',
    name: '',
  },
})

const initialState: States.AllStates = {
  id: null,
  name: null,
  phoneNumber: null,
  email: null,
  address: null,
  detailAddress: null,
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return { ...state, id: action.payload.id, name: action.payload.name }
    default:
      return state
  }
}

export default reducer
