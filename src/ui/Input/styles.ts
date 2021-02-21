import FeatherIcon from 'react-native-vector-icons/Feather'
import styled, { css } from 'styled-components/native'

type ContainerProps = {
  isFocused: boolean
  hasError: boolean
}

const modifier = {
  hasError: () => css`
    border-color: #cd3030;
  `,
  isFocused: () => css`
    border-color: #ff9000;
  `,
}

export const Container = styled.View<ContainerProps>`
  ${({ isFocused, hasError }) => css`
    width: 100%;
    height: 52px;
    padding: 0 16px;
    background: #232129;
    border-width: 2px;
    border-color: #232129;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;

    ${hasError && modifier.hasError()}
    ${isFocused && modifier.isFocused()}
  `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #ffffff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
