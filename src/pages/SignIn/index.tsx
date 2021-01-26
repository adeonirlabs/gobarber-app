import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import logoImg from 'assets/logo.png'
import { useAuth } from 'hooks/auth'
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

type SignInProps = {
  email?: string
  password?: string
}

const SignIn = () => {
  const navigation = useNavigation()

  const { signIn } = useAuth()

  const passwordInputRef = useRef<TextInput>(null)

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail é obrigatório')
      .email('Insira um e-mail válido'),
    password: Yup.string().required('Senha é obrigatória').min(3),
  })

  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    async (data: SignInProps) => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        })

        Alert.alert(
          'SignIn executado com sucesso!',
          'Você já pode usar a aplicação',
        )
      } catch (error) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu erro ao fazer login, verifique as credenciais',
        )
      }
    },
    [signIn],
  )

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
              <Input
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
