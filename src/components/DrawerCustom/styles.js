import styled from 'styled-components/native';
import ButtonDrawer from '../ButtonDrawer';

export const DrawerContent = styled.View `
  flex: 1;
  flex-direction: column;
  height: 600px;
  width: 220px;
  justify-content: space-around;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 25px;
  align-self: center;
  margin-top: 35px;
`;

export const Name = styled.Text`
  justify-content: center;
  align-items: center;
  margin-left: 65px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const UsersButton = styled(ButtonDrawer)`

`;

export const SubmitButton = styled(ButtonDrawer)`

`;

export const AboutButton = styled(ButtonDrawer)`

`;

export const LogoutButton = styled(ButtonDrawer)`
  margin-top: 50px;
  background: #FF142F;
`;