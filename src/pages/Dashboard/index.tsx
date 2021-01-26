import { useAuth } from 'hooks/auth'
import React from 'react'
import { View } from 'react-native'
import Button from 'ui/Button'

const Dashboard = () => {
  const { signOut } = useAuth()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      }}
    >
      <Button onPress={signOut} style={{ width: '100%' }}>
        Sair
      </Button>
    </View>
  )
}

export default Dashboard
