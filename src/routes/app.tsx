import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from 'pages/Dashboard'
import React from 'react'

const App = createStackNavigator()

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name='Dashboard' component={Dashboard} />
  </App.Navigator>
)

export default AppRoutes
