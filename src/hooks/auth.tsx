import asyncStorage from '@react-native-community/async-storage'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from 'services/api'

type Props = {
  children: React.ReactNode
}

type Credetials = {
  email?: string
  password?: string
}

type AuthData = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object
  loading: boolean
  signIn(credentials: Credetials): Promise<void>
  signOut(): void
}

type AuthState = {
  token: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object
}

const AuthContext = createContext<AuthData>({} as AuthData)

export const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedDate(): Promise<void> {
      const [[token], [user]] = await asyncStorage.multiGet([
        '@GoBarber: token',
        '@GoBarber: user',
      ])

      if (token && user) {
        setData({ token, user: JSON.parse })
      }

      setLoading(false)
    }

    loadStoragedDate()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    await asyncStorage.multiSet([
      ['@GoBarber: token', token],
      ['@GoBarber: user', JSON.stringify(user)],
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await asyncStorage.multiRemove(['@GoBarber: token', '@GoBarber: user'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'O hook useAuth precisa ser passado dentro de um AuthProvider',
    )
  }

  return context
}
