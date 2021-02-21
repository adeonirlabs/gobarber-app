import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from 'hooks/auth'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import api from 'services/api'
import Input from 'ui/Input'
import * as Yup from 'yup'

import * as S from './styles'

type ProfileData = {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile = () => {
  const { user, updateUser, signOut } = useAuth()
  const { navigate } = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    old_password: Yup.string(),
    password: Yup.string().when('old_password', {
      is: (val: string) => !!val.length,
      then: Yup.string().required('Campo obrigatório'),
      otherwise: Yup.string(),
    }),
    password_confirmation: Yup.string()
      .when('old_password', {
        is: (val: string) => !!val.length,
        then: Yup.string().required('Campo obrigatório'),
        otherwise: Yup.string(),
      })
      .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
  })

  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = useCallback(
    async (data: ProfileData) => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        }

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        navigate('Dashboard')
      } catch (error) {
        Alert.alert(
          'Erro na atualização!',
          'Ocorreu um erro ao atualizar perfil, tente novamente.',
        )
      }
    },
    [navigate, schema, updateUser],
  )

  const goToDashboard = useCallback(() => {
    navigate('Dashboard')
  }, [navigate])

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={goToDashboard}>
          <Icon name='arrow-left' size={20} color='#fff' />
        </S.BackButton>

        <S.HeaderTitle>Meu perfil</S.HeaderTitle>

        <S.SignOutButton onPress={signOut}>
          <Icon name='power' size={20} color='#fff' />
        </S.SignOutButton>
      </S.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <S.ProfileWrapper>
            <View>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <S.UserAvatarButton onPress={() => {}}>
                <S.UserAvatar source={{ uri: user.avatar_url }} />
              </S.UserAvatarButton>

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
                  oldPasswordInputRef.current?.focus()
                }}
                hasError={errors.email}
              />
              <Input
                ref={oldPasswordInputRef}
                control={control}
                name='old_password'
                icon='lock'
                placeholder='Senha atual'
                returnKeyType='next'
                textContentType='password'
                secureTextEntry
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
                hasError={errors.password}
                containerStyle={{ marginTop: 16 }}
              />
              <Input
                ref={passwordInputRef}
                control={control}
                name='password'
                icon='lock'
                placeholder='Nova senha'
                returnKeyType='next'
                textContentType='newPassword'
                secureTextEntry
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus()
                }}
                hasError={errors.password}
              />
              <Input
                ref={confirmPasswordInputRef}
                control={control}
                name='password_confirmation'
                icon='lock'
                placeholder='Confirmar senha'
                returnKeyType='send'
                onSubmitEditing={handleSubmit(onSubmit)}
                textContentType='newPassword'
                secureTextEntry
                hasError={errors.password}
              />
            </View>

            <S.ConfirmButton onPress={handleSubmit(onSubmit)}>
              Confirmar mudançças
            </S.ConfirmButton>
          </S.ProfileWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </S.Container>
  )
}

export default Profile
