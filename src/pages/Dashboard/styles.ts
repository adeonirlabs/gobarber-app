import { FlatList } from 'react-native'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import { Provider } from '.'

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

export const UserInfo = styled.Text`
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

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #1e1d23;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`

export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 24px;
`

export const ProviderItem = styled.TouchableOpacity`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px 16px;
  margin-bottom: 16px;
  flex-direction: row;
`

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background: #28262e;
`

export const ProviderInfo = styled.View`
  margin-left: 20px;
  flex: 1;
`

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: auto;
`

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`

export const ProviderMetaText = styled.Text`
  color: #999591;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
`
