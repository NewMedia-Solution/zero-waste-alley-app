export const checkIdResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
      message: '',
    },
  }
}

export const signUpResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
      message: '',
    },
  }
}

export const findIdResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      id: 'testId',
      message: '',
    },
  }
}

export const identityVerificationResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
    },
  }
}

export const changePasswordResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
    },
  }
}

export const loginResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
      message: '',
    },
  }
}

export const getUserInfoResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      id: 'testId',
      name: '테스트',
      phoneNum: '01011112222',
      email: 'test@gmail.com',
      address1: '서울 관악구 신림로3가길 2',
      address2: '빌딩',
      zipCode: '08815',
      roomNum: 101,
      adminYn: 'Y',
    },
  }
}

export const checkQrCodeResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      state: true,
    },
  }
}

export const requestBuildingListResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      data: [
        {
          address1: '서울 관악구 신림로3가길 2',
          address2: '빌딩',
          building_id: '1',
        },
      ],
    },
  }
}

export const requestResidentListResponse: any = () => {
  return {
    response: {
      ok: true,
    },
    json: {
      data: [
        {
          member_id: '1',
          approval_state: 'W',
          room_num: '102',
        },
        {
          member_id: '2',
          approval_state: 'C',
          room_num: '103',
        },
      ],
    },
  }
}
