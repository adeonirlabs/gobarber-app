import React from 'react'
import { TouchableHighlightProps } from 'react-native'

import * as S from './styles'

type Props = {
  children: string
} & TouchableHighlightProps

const Button = ({ children, ...props }: Props) => (
  <S.Container {...props} activeOpacity={1} underlayColor={'#e68200'}>
    <S.Text>{children}</S.Text>
  </S.Container>
)

export default Button
