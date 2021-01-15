import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import * as S from './styles'

type Props = {
  children: string
} & RectButtonProperties

const Button = ({ children, ...props }: Props) => (
  <S.Container {...props}>
    <S.Text>{children}</S.Text>
  </S.Container>
)

export default Button
