export type UserInfoJson = {
  id: string
  name: string
  phoneNum: string
  email: string
  address1: string
  address2: string
  adminYn: boolean
}

export type UserInfo = {
  id: string
  name: string
  phoneNumber: string
  email: string
  address: string
  detailAddress: string
  isAdmin: boolean
}

export type AllStates = {
  isLogin: boolean
  id: string | null
  name: string | null
  phoneNumber: string | null
  email: string | null
  address: string | null
  detailAddress: string | null
  isAdmin: boolean
}

export type AnyStates = UserInfo | boolean | string | null
