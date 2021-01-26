import { useAuth } from 'hooks/auth'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import AppRoutes from './app'
import AuthRoutes from './auth'

const Routes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#312e38',
        }}
      >
        <ActivityIndicator size='large' color='#ff9000' />
      </View>
    )
  }
  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
