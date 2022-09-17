import { AllStates as UserStates } from './User/stateTypes'
import { AllStates as ModalStates } from './Modal/stateTypes'

export type AppState = {
  User: UserStates
  Modal: ModalStates
}
