import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Button, Icon, Image } from '@rneui/themed'
import React, { FC, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { mainColor } from '../../constants/Colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { uploadImage } from '../../app/cloudinary'
import SplashScreen from '../SplashScreen'
import { RootStackScreenProps } from '../../types'
import { UpdateUserAction } from '../../reducers/userSlice'
import Toast from 'react-native-root-toast'

export const ProfileScreen: FC<RootStackScreenProps<'ProfileScreen'>> = ({ navigation, route }) => {
  const user = route.params.user
  const dispatch = useAppDispatch()
  const [name, setName] = useState(user.name)
  const [editName, setEditName] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const handleUpdateProfile = () => {
    if (!name) {
      alert('Please enter your name')
      return
    }
    dispatch(UpdateUserAction({ name }))
    Toast.show('Update profile successfully', {
      duration: 100,
      position: 90,
      animation: true,
      hideOnPress: true,
    })
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput
              style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20 }}
              placeholder={user.email}
              value={user.email}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Name</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <TextInput
                style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
                placeholder={name}
                value={name}
                editable={editName}
                onChangeText={setName}
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <Icon name="edit-2" type="feather" size={18} onPress={() => setEditName(!editName)} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', marginBottom: 5 }}>
            <Text style={styles.textTitle}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <TextInput
                style={{ backgroundColor: '#fbfbfb', padding: 10, borderRadius: 20, width: '100%' }}
                placeholder="*************"
                editable={editPassword}
              />
              <View style={{ position: 'absolute', right: 10 }}>
                <Icon
                  name="edit-2"
                  type="feather"
                  size={18}
                  onPress={() => navigation.navigate('ChangePasswordScreen')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.groupButton}>
          <Button
            title={'Back'}
            containerStyle={{
              width: 100,
              height: 40,
              borderRadius: 20,
            }}
            onPress={() => navigation.goBack()}
          />
          <Button
            title={'Save'}
            containerStyle={{
              width: 100,
              height: 40,
              borderRadius: 20,
            }}
            buttonStyle={{
              backgroundColor: '#000000',
            }}
            onPress={handleUpdateProfile}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'capitalize',
    fontFamily: 'SansPro',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: mainColor,
  },
  body: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 40,
  },
  textTitle: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'SansPro',
    marginBottom: 5,
  },
  groupButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
