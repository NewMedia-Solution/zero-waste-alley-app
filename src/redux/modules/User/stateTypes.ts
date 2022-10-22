export type UserInfoJson = {
  id: string | null
  name: string | null
  phoneNum: string | null
  email: string | null
  address1: string | null
  address2: string | null
  zipCode: string | null
  roomNum: string | null
  adminYn: string
}

export type UserInfo = {
  id: string | null
  name: string | null
  phoneNumber: string | null
  email: string | null
  address: string | null
  zoneCode: string | null
  detailAddress: string | null
  unit: string | null
  isAdmin: boolean
}

export type AllStates = {
  isLogin: boolean
  id: string | null
  name: string | null
  phoneNumber: string | null
  email: string | null
  address: string | null
  zoneCode: string | null
  detailAddress: string | null
  unit: string | null
  isAdmin: boolean
}

export type AnyStates = UserInfo | boolean | string | null
