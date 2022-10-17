import { RESIDENT_APPROVAL_STATE } from '../../../Enums'

export type BuildingInfoJson = {
  address1: string
  address2: string
  building_id: string
}

export type BuildingListJson = BuildingInfoJson[]

export type BuildingInfo = {
  address: string
  detailAddress: string
  buildingId: string
}

export type BuildingList = BuildingInfo[]

export type ResidentInfoJson = {
  member_id: string
  approval_state: RESIDENT_APPROVAL_STATE
  room_num: number
}

export type ResidentListJson = ResidentInfoJson[]

export type ResidentInfo = {
  residentId: string
  approvalState: RESIDENT_APPROVAL_STATE
  roomNumber: number
}
export type ResidentList = ResidentInfo[]

export type AllStates = {
  buildingList: BuildingList
  residentList: ResidentList
}

export type AnyStates = BuildingList | ResidentList
