import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${getBottomSpace()}px;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Info = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #1e1d23;
`
