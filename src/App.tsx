import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { AppProvider } from 'hooks/provider'
import React from 'react'
import { StatusBar, View } from 'react-native'

import Routes from './routes'

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle='light-content' backgroundColor='#312e38' translucent />
    <AppProvider>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App
