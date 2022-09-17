import * as States from './stateTypes'
import * as Actions from './actionTypes'
import type * as Types from './types'

export const setIsShowingDefaultPopup: Actions.ISetIsShowingDefaultPopup =
  () => ({
    type: Actions.SET_IS_SHOWING_DEFAULT_POPUP,
  })

export const hidePopup: Actions.IHidePopup = () => ({
  type: Actions.HIDE_POPUP,
})

const initialState: States.AllStates = {
  isShowingDefaultPopup: false,
}

const reducer: Types.IReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_IS_SHOWING_DEFAULT_POPUP:
      return { ...state, isShowingDefaultPopup: true }
    case Actions.HIDE_POPUP:
      return { ...state, isShowingDefaultPopup: false }
    default:
      return state
  }
}

export default reducer
