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

export type AllStates = {
  buildingList: BuildingList
}

export type AnyStates = BuildingList
