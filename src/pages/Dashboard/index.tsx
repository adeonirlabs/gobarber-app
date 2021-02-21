import { useNavigation } from '@react-navigation/native'
import { useAuth } from 'hooks/auth'
import React, { useCallback } from 'react'

import * as S from './styles'

const Dashboard = () => {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const goToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  return (
    <S.Container>
      <S.Header>
        <S.Info>
          Bem vindo,
          {'\n'}
          <S.UserName>{user.name}</S.UserName>
        </S.Info>

        <S.ProfileButton onPress={goToProfile}>
          <S.Avatar source={{ uri: user.avatar_url }} />
        </S.ProfileButton>
      </S.Header>
    </S.Container>
  )
}

export default Dashboard
