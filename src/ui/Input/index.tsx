import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import * as S from './styles'

type InputProps = {
  icon?: string
} & TextInputProps

const Input = forwardRef<TextInput, InputProps>(
  ({ icon, ...props }, forwardedRef) => {
    return (
      <S.Container>
        {icon && <S.Icon name={icon} size={20} color='#666360' />}

        <S.TextInput
          ref={forwardedRef}
          keyboardAppearance='dark'
          placeholderTextColor='#666360'
          {...props}
        />
      </S.Container>
    )
  },
)

export default Input
