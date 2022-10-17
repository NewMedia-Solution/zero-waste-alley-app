import React from 'react'

type Props = {
  title?: string
  content: string
  onPress?: () => void
}

export type IDefaultPopup = React.FC<Props>
