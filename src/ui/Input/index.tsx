import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'

type Props = {
  icon?: string
} & TextInputProps

const Input = ({ icon, ...props }: Props) => (
  <S.Container>
    {icon && <S.Icon name={icon} size={20} color='#666360' />}

    <S.TextInput
      keyboardAppearance='dark'
      placeholderTextColor='#666360'
      {...props}
    />
  </S.Container>
)

export default Input
