import { useNavigation } from '@react-navigation/native'
import { useAuth } from 'hooks/auth'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import api from 'services/api'

import * as S from './styles'

export type ProviderProps = {
  id: string
  name: string
  avatar_url: string
}

const Dashboard = () => {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const [providers, setProviders] = useState<ProviderProps[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const goToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const goToNewAppointment = useCallback(
    (providerID: string) => {
      navigate('NewAppointment', { providerID })
    },
    [navigate],
  )

  return (
    <S.Container>
      <S.Header>
        <S.UserInfo>
          Bem vindo,
          {'\n'}
          <S.UserName>{user.name}</S.UserName>
        </S.UserInfo>

        <S.ProfileButton onPress={goToProfile}>
          <S.UserAvatar source={{ uri: user.avatar_url }} />
        </S.ProfileButton>
      </S.Header>

      <S.ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <S.ProvidersListTitle>Cabeleireiros</S.ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <S.ProviderItem onPress={() => goToNewAppointment(provider.id)}>
            <S.ProviderAvatar source={{ uri: provider.avatar_url }} />
            <S.ProviderInfo>
              <S.ProviderName>{provider.name}</S.ProviderName>

              <S.ProviderMeta>
                <Icon name='calendar' size={14} color='#ff9000' />
                <S.ProviderMetaText>Segunda a Sexta</S.ProviderMetaText>
              </S.ProviderMeta>
              <S.ProviderMeta>
                <Icon name='clock' size={14} color='#ff9000' />
                <S.ProviderMetaText>8h às 18h</S.ProviderMetaText>
              </S.ProviderMeta>
            </S.ProviderInfo>
          </S.ProviderItem>
        )}
      />
    </S.Container>
  )
}

export default Dashboard
