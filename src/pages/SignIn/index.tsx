import React, { useCallback, useRef } from 'react'
import {
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'

import Button from 'ui/Button'
import Input from 'ui/Input'

import logoImg from 'assets/logo.png'

import * as S from './styles'

const SignIn = () => {
  const navigation = useNavigation()

  const passwordInputRef = useRef<TextInput>(null)

  const { handleSubmit, control } = useForm()
  const onSubmit = useCallback((data: object) => console.log(data), [])

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

            <View>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ onChange }: ControllerRenderProps) => (
                  <Input
                    icon='mail'
                    placeholder='E-mail'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType='next'
                    onChangeText={text => onChange(text)}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus()
                    }}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ onChange }: ControllerRenderProps) => (
                  <Input
                    ref={passwordInputRef}
                    icon='lock'
                    placeholder='Senha'
                    returnKeyType='send'
                    onChangeText={text => onChange(text)}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    secureTextEntry
                  />
                )}
              />

              <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
            </View>

            <S.ForgotPassword
              onPress={() => console.log('Esqueci minha senha')}
            >
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccount onPress={() => navigation.navigate('SignUp')}>
        <Icon name='log-in' size={20} color='#ff9000' />
        <S.CreateAccountText>Criar uma conta</S.CreateAccountText>
      </S.CreateAccount>
    </>
  )
}

export default SignIn
