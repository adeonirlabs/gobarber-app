import { Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import Button from 'ui/Button'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const BackButton = styled.TouchableOpacity``

export const SignOutButton = styled.TouchableOpacity``

export const ProfileWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px 40px ${Platform.OS === 'ios' ? 40 : 150}px;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  margin-bottom: 32px;
  background: #28262e;
  align-self: center;
`

export const ConfirmButton = styled(Button)``
