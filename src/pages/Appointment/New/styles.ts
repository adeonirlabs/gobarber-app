import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled, { css } from 'styled-components/native'

import { ProviderProps } from '.'

type ProviderItemProps = {
  selected?: boolean
}

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  background: #28262e;
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

export const BackButton = styled.TouchableOpacity`
  margin-right: 36px;
`

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #1e1d23;
`

export const ProvidersContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(
  FlatList as new () => FlatList<ProviderProps>,
)`
  padding: 32px 24px;
`

export const ProviderItem = styled(RectButton)<ProviderItemProps>`
  ${({ selected }) => css`
    background: ${selected ? '#ff9000' : '#3e3b47'};
    border-radius: 10px;
    padding: 8px 12px;
    margin-right: 12px;
    flex-direction: row;
    align-items: center;
  `}
`

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #28262e;
`

export const ProviderName = styled.Text<ProviderItemProps>`
  ${({ selected }) => css`
    color: ${selected ? '#232129' : '#f4ede8'};
    font-size: 14px;
    font-family: 'RobotoSlab-Medium';
    margin-left: 8px;
  `}
`
