import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { useAppDispatch } from '../../app/hook'
import * as ImagePicker from 'expo-image-picker'

import React, { FC, useState } from 'react'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { createDeviceAction } from '../../reducers/deviceSlice'
import { RootStackScreenProps } from '../../types'

export const EditDeviceScreen: FC<RootStackScreenProps<'EditDeviceScreen'>> = ({ route, navigation }) => {
  const device = route.params.device
  const dispatch = useAppDispatch()
  const [image, setImage] = useState(device.image || 'https://cdn-icons-png.flaticon.com/512/49/49672.png')
  const [token, setToken] = useState(device.token)
  const [name, setName] = useState(device.name)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const btnUpdateDevice = () => {
    console.log(name, image, token)
    dispatch(createDeviceAction({ name, image, token }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputForm}>
          <Text style={styles.name}>Name</Text>
          <TextInput style={styles.input} onChangeText={(text) => setName(text)} value={name} />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.name}>Image</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <Button
            title="upload"
            onPress={pickImage}
            titleStyle={{
              flexWrap: 'wrap',
              fontSize: 14,
            }}
            buttonStyle={{
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.name}>Token</Text>
          <TextInput
            style={{ ...styles.input, marginRight: 5 }}
            value={token}
            onChangeText={(text) => setToken(text)}
          />
          <Button
            title="Scan QR"
            titleStyle={{
              flexWrap: 'wrap',
              fontSize: 14,
            }}
            buttonStyle={{
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('ScanQrCode', { setToken })}
          />
        </View>
        <View style={styles.inputForm}>
          <Button
            title="Update device"
            buttonStyle={{
              borderRadius: 10,
              backgroundColor: '#000000',
            }}
            onPress={btnUpdateDevice}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  form: {
    margin: 20,
    width: '100%',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    width: '100%',
    height: 50,
  },
  image: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    resizeMode: 'contain',
    marginRight: 30,
    marginBottom: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginRight: 10,
  },
})
