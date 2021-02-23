import { createStackNavigator } from '@react-navigation/stack'
import AppointmentCreated from 'pages/Appointment/Created'
import NewAppointment from 'pages/Appointment/New'
import Dashboard from 'pages/Dashboard'
import Profile from 'pages/Profile'
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
    <App.Screen name='NewAppointment' component={NewAppointment} />
    <App.Screen name='AppointmentCreated' component={AppointmentCreated} />

    <App.Screen name='Profile' component={Profile} />
  </App.Navigator>
)

export default AppRoutes
