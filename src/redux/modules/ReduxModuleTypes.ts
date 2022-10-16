import { AllStates as UserStates } from './User/stateTypes'
import { AllStates as ModalStates } from './Modal/stateTypes'
import { AllStates as AdminStates } from './Admin/stateTypes'

export type AppState = {
  User: UserStates
  Modal: ModalStates
  Admin: AdminStates
}
