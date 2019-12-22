import React, { useState, useEffect } from 'react';
import {
  Text
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '../../assets/logo.jpg';

import { DrawerItems } from 'react-navigation-drawer';

import { SafeAreaView, ScrollView } from 'react-navigation';

import { DrawerContent, Avatar, Name, UsersButton, SubmitButton, AboutButton, LogoutButton } from './styles';

export default function DrawerCustomAdm({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const [loading, setLoading] = useState(true);
  //const [avatar, setAvatar] = useState(profile.avatar.url);

  useEffect(() => {
    setLoading(false);
  }, [profile]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center',
      alignItems: 'center', width: 300, height: 800 }}>
      <ScrollView>
        <DrawerContent style={{flex: 1, flexDirection: 'column',
          justifyContent: 'space-around', width: 230, height: 800}}>
          <Avatar
            source={{
              uri: profile.avatar
              ? profile.avatar.url
              : `https://api.adorable.io/avatars/50/${profile.name}.png`,
            }}
          />

          <Name>Olá {profile.name}</Name>

          <SubmitButton onPress={() =>
            navigation.navigate('ProfileEditAdm')
            }>Atualizar Perfil</SubmitButton>

          <UsersButton onPress={() =>
            navigation.navigate('Users')
            }>Todos os usuários</UsersButton>

          <UsersButton onPress={() =>
            navigation.navigate('CreateUser')
            }>Cadastrar um novo usuário</UsersButton>

          <UsersButton onPress={() =>
            navigation.navigate('CreateService')
            }>Cadastrar um novo serviço</UsersButton>

          <UsersButton onPress={() =>
            navigation.navigate('SelectServiceEdit')
            }>Editar serviços cadastrados</UsersButton>

          <AboutButton onPress={() =>
            navigation.navigate('AboutAdm')
            }>Sobre</AboutButton>
          <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
        </DrawerContent>
      </ScrollView>
    </SafeAreaView>
  );
}

/**<DrawerItems {...props} />**/
