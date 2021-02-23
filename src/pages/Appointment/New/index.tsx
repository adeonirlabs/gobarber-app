import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import { useAuth } from 'hooks/auth'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import api from 'services/api'

import * as S from './styles'

type RouteParams = {
  providerID: string
}

export type ProviderProps = {
  id: string
  name: string
  avatar_url: string
}

type AvailabilityProps = {
  hour: number
  available: boolean
}

const NewAppointment = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()

  const route = useRoute()
  const { providerID } = route.params as RouteParams

  const [providers, setProviders] = useState<ProviderProps[]>([])
  const [selectedProvider, setSelectedProvider] = useState(providerID)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)

  const [availability, setAvailability] = useState<AvailabilityProps[]>([])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data)
      })
  }, [selectedDate, selectedProvider])

  const goToDashboard = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((id: string) => {
    setSelectedProvider(id)
  }, [])

  const handleChangeDate = useCallback(
    (event: Event, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }
      if (date) {
        setSelectedDate(date)
      }
    },
    [],
  )

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  const toggleDatePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker)
  }, [showDatePicker])

  const mornigAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          formatedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 13)
      .map(({ hour, available }) => {
        return {
          hour,
          formatedHour: format(new Date().setHours(hour), 'HH:00'),
          available,
        }
      })
  }, [availability])

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={goToDashboard}>
          <Icon name='arrow-left' size={20} color='#fff' />
        </S.BackButton>

        <S.HeaderTitle>Agendamento</S.HeaderTitle>

        <S.UserAvatar source={{ uri: user.avatar_url }} />
      </S.Header>

      <S.MainContent>
        <S.ProvidersContainer>
          <S.ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <S.ProviderItem
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <S.ProviderAvatar source={{ uri: provider.avatar_url }} />
                <S.ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </S.ProviderName>
              </S.ProviderItem>
            )}
          />
        </S.ProvidersContainer>

        <S.Calendar>
          <S.CalendarTitle>Escolha a data</S.CalendarTitle>

          <S.DatePickerButton onPress={toggleDatePicker}>
            <S.DatePickerButtonText>
              Selecionar outra data
            </S.DatePickerButtonText>
          </S.DatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode='date'
              is24Hour
              display='spinner'
              textColor='#f4ede8'
              onChange={handleChangeDate}
            />
          )}
        </S.Calendar>

        <S.Schedule>
          <S.CalendarTitle>Escolha o horário</S.CalendarTitle>

          <S.Section>
            <S.SectionTitle>Manhã</S.SectionTitle>

            <S.SectionContent>
              {mornigAvailability.map(({ hour, formatedHour, available }) => (
                <S.Hour
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  key={formatedHour}
                  onPress={() => handleSelectHour(hour)}
                >
                  <S.HourText selected={selectedHour === hour}>
                    {formatedHour}
                  </S.HourText>
                </S.Hour>
              ))}
            </S.SectionContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tarde</S.SectionTitle>

            <S.SectionContent>
              {afternoonAvailability.map(
                ({ hour, formatedHour, available }) => (
                  <S.Hour
                    enabled={available}
                    available={available}
                    selected={selectedHour === hour}
                    key={formatedHour}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <S.HourText selected={selectedHour === hour}>
                      {formatedHour}
                    </S.HourText>
                  </S.Hour>
                ),
              )}
            </S.SectionContent>
          </S.Section>
        </S.Schedule>
      </S.MainContent>
    </S.Container>
  )
}

export default NewAppointment
