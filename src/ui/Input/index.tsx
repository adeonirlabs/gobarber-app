import React, { forwardRef, useCallback, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import * as S from './styles'

type InputProps = {
  icon?: string
} & TextInputProps

const Input = forwardRef<TextInput, InputProps>(
  ({ icon, ...props }, forwardedRef) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleInputFocus = useCallback(() => {
      setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
      setIsFocused(false)
    }, [])

    return (
      <S.Container isFocused={isFocused}>
        {icon && (
          <S.Icon
            name={icon}
            size={20}
            color={isFocused ? '#ff9000' : '#666360'}
          />
        )}

        <S.TextInput
          ref={forwardedRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          keyboardAppearance='dark'
          placeholderTextColor='#666360'
          {...props}
        />
      </S.Container>
    )
  },
)

export default Input
