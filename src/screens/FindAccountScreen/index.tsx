import React from 'react'
import ChangePassword from './components/ChangePassword'
import FindId from './components/FindId'

const FindAccountScreen = ({ route }: any) => {
  return route.params.via === 'findPassword' ? <ChangePassword /> : <FindId />
}

export default FindAccountScreen
