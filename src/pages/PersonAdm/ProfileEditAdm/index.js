import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container, Avatar, Separator, Form, FormInput, SubmitButton, LogoutButton } from './styles';
import api from '~/services/api';

export default function ProfileEditAdm({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const nameRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(profile.avatar.url)
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageId, setImageId] = useState();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
    setLoading(false);
  }, [profile]);

  function showImagePicker() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem'
      },
      upload => {
        if (upload.uri) {
          const previewData = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic'? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const imageData = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          setPreview(previewData);
          handleUploadImage(imageData);
        }
      }
    )
  }

  async function handleUploadImage(imageData) {
    const data = new FormData();

    data.append('images', imageData);

    const response = await api.post('file', data);

    setImageId(response.data);
  }

  function handleSubmit() {
    dispatch(updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  return (
    <Background>
      { loading ? (
        <ActivityIndicator size="large" color="#FFF" align="center"
        style={styles.load}/>
      ) : (
        <Container>
          <Form>
          <Avatar
                source={{
                  uri: profile.avatar
                    ? profile.avatar.url
                    : `https://api.adorable.io/avatars/50/${profile.name}.png`,
                }}
                />

          <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => OldpasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <Separator />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua senha atual"
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua nova senha"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Confirmação de senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>

          </Form>
      </Container>
      )}

    </Background>
  );
}

ProfileEditAdm.navigationOptions = ({ navigation }) => ({
  title: 'Edite seu perfil',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProfileAdm');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },
})
