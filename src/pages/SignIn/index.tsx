import React from 'react'
import { Image } from 'react-native'

import Button from 'ui/Button'
import Input from 'ui/Input'

import logoImg from 'assets/logo.png'

import * as S from './styles'

const SignIn = () => {
  return (
    <S.Container>
      <Image source={logoImg} />

      <S.Title>Faça seu login</S.Title>

      <Input name='email' icon='mail' placeholder='E-mail' />
      <Input name='password' icon='lock' placeholder='Senha' />

      <Button onPress={() => console.log('Entrar')}>Entrar</Button>
    </S.Container>
  )
}

export default SignIn
