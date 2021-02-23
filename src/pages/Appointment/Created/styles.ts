import styled from 'styled-components/native'
import Button from 'ui/Button'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 30px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  margin-top: 16px;
`

export const Description = styled.Text`
  color: #999591;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  margin-top: 24px;
`

export const OkButton = styled(Button)`
  margin: 36px 24px 0;
  padding: 0 36px;
`
