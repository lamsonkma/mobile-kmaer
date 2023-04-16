import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { NewPassWordAction, selectLoading } from '../../reducers/userSlice'
import SplashScreen from '../SplashScreen'
import Toast from 'react-native-root-toast'
const width = Dimensions.get('window').width
export const NewPassWordScreen = () => {
  const navigator = useNavigation()
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()
  const [newPassWord, setNewPassWord] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = () => {
    if (!newPassWord || !confirmPassword) {
      Alert.alert('Please enter full information')
      return
    }

    if (newPassWord !== confirmPassword) {
      Alert.alert('Password not match')
      return
    }

    dispatch(
      NewPassWordAction({
        password: newPassWord,
        confirmPassword,
      }),
    )

    navigator.navigate('SignIn')

    Toast.show('Change password success', {
      duration: 100,
      position: 90,
      animation: true,
      hideOnPress: true,
    })
  }

  if (loading === 'loading') {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input inputStyle={styles.input} placeholder="New Password" value={newPassWord} onChangeText={setNewPassWord} />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          inputStyle={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  form: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
