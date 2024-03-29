import { TouchableHighlight } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TouchableHighlight)`
  height: 52px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`

export const Text = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
`
