import App from 'App'
import React from 'react'

import { AuthProvider } from './auth'

type Props = {
  children: React.ReactNode
}

const AppProvider = ({ children }: Props) => (
  <AuthProvider>{children}</AuthProvider>
)

export default AppProvider
