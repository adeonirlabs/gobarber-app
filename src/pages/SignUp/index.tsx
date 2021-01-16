import React from 'react'
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import Button from 'ui/Button'
import Input from 'ui/Input'

import logoImg from 'assets/logo.png'

import * as S from './styles'

const SignUp = () => {
  const navigation = useNavigation()

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

            <Input name='name' icon='user' placeholder='Nome' />
            <Input name='password' icon='lock' placeholder='Senha' />
            <Input name='password' icon='lock' placeholder='Senha' />

            <Button onPress={() => console.log('Entrar')}>
              Crie sua conta
            </Button>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <Icon name='arrow-left' size={20} color='#fff' />
        <S.BackToSignInText>Voltar para login</S.BackToSignInText>
      </S.BackToSignIn>
    </>
  )
}

export default SignUp
