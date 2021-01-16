import React from 'react'
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Button from 'ui/Button'
import Input from 'ui/Input'

import logoImg from 'assets/logo.png'

import * as S from './styles'

const SignIn = () => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <S.Container>
            <Image source={logoImg} />

            <View>
              <S.Title>Faça seu login</S.Title>
            </View>

            <Input name='email' icon='mail' placeholder='E-mail' />
            <Input name='password' icon='lock' placeholder='Senha' />

            <Button onPress={() => console.log('Entrar')}>Entrar</Button>

            <S.ForgotPassword
              onPress={() => console.log('esqueci minha senha')}
            >
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccountButton onPress={() => console.log('criar uma conta')}>
        <Icon name='log-in' size={20} color='#ff9000' />
        <S.CreateAccountButtonText>Criar uma conta</S.CreateAccountButtonText>
      </S.CreateAccountButton>
    </>
  )
}

export default SignIn
