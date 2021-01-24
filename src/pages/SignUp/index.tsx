import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import logoImg from 'assets/logo.png'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Button from 'ui/Button'
import Input from 'ui/Input'
import * as Yup from 'yup'

import * as S from './styles'

type SignUpProps = {
  name?: string
  email?: string
  password?: string
}

const SignUp = () => {
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .required('E-mail é obrigatório')
      .email('Insira um e-mail válido'),
    password: Yup.string().required('Senha é obrigatória').min(3),
  })

  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = useCallback((data: SignUpProps) => {
    try {
      console.log(data)
    } catch (error) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu erro ao fazer login, verifique as credenciais',
      )
    }
  }, [])

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
              <Input
                control={control}
                name='name'
                icon='user'
                placeholder='Nome'
                autoCapitalize='words'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
                hasError={errors.name}
              />
              <Input
                ref={emailInputRef}
                control={control}
                name='email'
                icon='mail'
                placeholder='E-mail'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
                hasError={errors.email}
              />
              <Input
                ref={passwordInputRef}
                control={control}
                name='password'
                icon='lock'
                placeholder='Senha'
                returnKeyType='send'
                onSubmitEditing={handleSubmit(onSubmit)}
                textContentType='newPassword'
                secureTextEntry
                hasError={errors.password}
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
