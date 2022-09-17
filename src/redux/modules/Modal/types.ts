import * as States from './stateTypes'
import * as Actions from './actionTypes'

export type IReducer = (
  state: States.AllStates,
  action: Actions.AnyActionTypes
) => States.AllStates
