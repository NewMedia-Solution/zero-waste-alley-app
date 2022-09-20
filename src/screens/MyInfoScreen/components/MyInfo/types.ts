import React from 'react'

export type Props = {
  isEditing: boolean
  title?: string
  data: string
  onChangeText: (text: string) => void
}

export type IMyInfo = React.FC<Props>
