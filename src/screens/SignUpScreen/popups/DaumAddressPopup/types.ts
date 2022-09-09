import React from 'react'

type Props = {
  isVisible: boolean
  setAddress: (address: string) => void
  setZoneCode: (zoneCode: string) => void
  hidePopup: () => void
}

export type IDaumAddressPopup = React.FC<Props>
