import React from 'react'

import { AuthProvider } from './auth'

type Props = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>{children}</AuthProvider>
)
