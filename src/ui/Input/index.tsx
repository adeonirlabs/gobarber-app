import React, { forwardRef, useCallback, useState } from 'react'
import { TextInput } from 'react-native'
import { FieldValues, useController } from 'react-hook-form'

import * as S from './styles'

type InputProps = {
  icon?: string
} & FieldValues

const Input = forwardRef<TextInput, InputProps>(
  ({ icon, name, control, ...props }, forwardedRef) => {
    const [isFocused, setIsFocused] = useState(false)
    const { field } = useController({ name, control })

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
          {...field}
          ref={forwardedRef}
          onChangeText={text => field.onChange(text)}
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
