export const SET_IS_SHOWING_DEFAULT_POPUP = 'Modal/SET_IS_SHOWING_DEFAULT_POPUP'
export const HIDE_POPUP = 'Modal/HIDE_POPUP'

type SetIsShowingDefaultPopupAction = {
  type: typeof SET_IS_SHOWING_DEFAULT_POPUP
}

type HidePopupAction = {
  type: typeof HIDE_POPUP
}

export type AnyActionTypes = SetIsShowingDefaultPopupAction | HidePopupAction

export type ISetIsShowingDefaultPopup = () => SetIsShowingDefaultPopupAction

export type IHidePopup = () => HidePopupAction
