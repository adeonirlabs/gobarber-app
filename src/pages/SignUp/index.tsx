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

const SignUp = () => {
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
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
              <S.Title>Crie sua conta</S.Title>
            </View>

            <View>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                render={({ onChange }: ControllerRenderProps) => (
                  <Input
                    icon='user'
                    placeholder='Nome'
                    autoCapitalize='words'
                    autoCorrect={false}
                    returnKeyType='next'
                    onChangeText={text => onChange(text)}
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus()
                    }}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ onChange }: ControllerRenderProps) => (
                  <Input
                    ref={emailInputRef}
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
                    textContentType='newPassword'
                    secureTextEntry
                  />
                )}
              />

              <Button onPress={handleSubmit(onSubmit)}>Cadastrar</Button>
            </View>
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
