import React, { useState } from 'react'
import ChangePassword from './components/ChangePassword'
import FindId from './components/FindId'
import IdentityVerification from './components/IdentityVerification'

const FindAccountScreen = ({ route }: any) => {
  const [id, setId] = useState('')
  const [isVerifiedIdentity, setIsVerifiedIdentity] = useState(false)

  return route.params.via === 'findId' ? (
    <FindId />
  ) : isVerifiedIdentity ? (
    <ChangePassword id={id} />
  ) : (
    <IdentityVerification
      setIsVerifiedIdentity={setIsVerifiedIdentity}
      setVerifiedId={setId}
    />
  )
}

export default FindAccountScreen
