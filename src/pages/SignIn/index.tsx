import React from 'react'
import { Image } from 'react-native'
import logoImg from '../../assets/logo.png'

import * as S from './styles'

const SignIn = () => {
  return (
    <S.Container>
      <Image source={logoImg} />

      <S.Title>Faça seu login</S.Title>
    </S.Container>
  )
}

export default SignIn
