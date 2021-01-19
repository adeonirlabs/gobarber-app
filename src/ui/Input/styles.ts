import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

type ContainerProps = {
  isFocused: boolean
}

const modifier = {
  isFocused: () => css`
    border-color: #ff9000;
  `,
}

export const Container = styled.View<ContainerProps>`
  ${({ isFocused }) => css`
    width: 100%;
    height: 60px;
    padding: 8px 16px;
    background: #232129;
    border-width: 1px;
    border-color: #232129;
    border-radius: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;

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
