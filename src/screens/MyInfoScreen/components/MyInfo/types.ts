import React from 'react'

export type Props = {
  isEditing: boolean
  title?: string
  data: string | null
  secureTextEntry?: boolean
  onChangeText: (text: string) => void
  onPressButton?: () => void
}

export type IMyInfo = React.FC<Props>
