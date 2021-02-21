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

type User = {
  id: string
  name: string
  email: string
  avatar_url: string
}

type AuthState = {
  token: string
  user: User
}

type Credetials = {
  email?: string
  password?: string
}

type AuthData = {
  user: User
  loading: boolean
  signIn(credentials: Credetials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
}

const AuthContext = createContext<AuthData>({} as AuthData)

export const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedDate(): Promise<void> {
      const [[, token], [, user]] = await asyncStorage.multiGet([
        '@GoBarber: token',
        '@GoBarber: user',
      ])

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user: JSON.parse(user) })
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

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await asyncStorage.multiRemove(['@GoBarber: token', '@GoBarber: user'])

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    async (user: User) => {
      await asyncStorage.setItem('@GoBarber: user', JSON.stringify(user))

      setData({
        token: data.token,
        user: {
          ...data.user,
          ...user,
        },
      })
    },
    [data],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
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
