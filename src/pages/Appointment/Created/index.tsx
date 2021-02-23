import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'

import * as S from './styles'

const AppointmentCreated = () => {
  const { reset } = useNavigation()

  const goToDashboard = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [reset])

  return (
    <S.Container>
      <Icon name='check' size={60} color='#04d361' />

      <S.Title>
        Agendamento
        {'\n'}
        Concluído
      </S.Title>

      <S.Description>
        Terça, dia 14 de março de 2020 às 12:00h com Diego Fernandes
      </S.Description>

      <S.OkButton onPress={goToDashboard}>Ok</S.OkButton>
    </S.Container>
  )
}

export default AppointmentCreated
