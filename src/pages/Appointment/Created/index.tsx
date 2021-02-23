import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import api from 'services/api'

import * as S from './styles'

type RouteParams = {
  date: number
  providerID: string
}

type ProviderProps = {
  id: string
  name: string
  avatar_url: string
}

const AppointmentCreated = () => {
  const { reset } = useNavigation()

  const { params } = useRoute()
  const { date, providerID } = params as RouteParams

  const [providers, setProviders] = useState<ProviderProps[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const goToDashboard = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    const string = format(
      date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
      {
        locale: ptBR,
      },
    )
    return string.charAt(0).toUpperCase() + string.slice(1)
  }, [date])

  const providerName = useMemo(() => {
    return providers.find(provider => provider.id === providerID)
  }, [providers, providerID])

  return (
    <S.Container>
      <Icon name='check' size={60} color='#04d361' />

      <S.Title>
        Agendamento
        {'\n'}
        Concluído
      </S.Title>

      <S.Description>
        {`${formattedDate} ${'\n'} com ${providerName?.name}`}
      </S.Description>

      <S.OkButton onPress={goToDashboard}>Ok</S.OkButton>
    </S.Container>
  )
}

export default AppointmentCreated
