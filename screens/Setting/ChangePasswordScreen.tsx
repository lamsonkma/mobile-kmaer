import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { selectLoading, UpdateUserProfileAction } from '../../reducers/userSlice'
import SplashScreen from '../SplashScreen'
const width = Dimensions.get('window').width
export const ChangePasswordScreen = () => {
  const loading = useAppSelector(selectLoading)
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const [newPassWord, setNewPassWord] = useState('')
  const [oldPassWord, setOldPassWord] = useState('')

  const handleChangePassword = () => {
    if (!newPassWord || !oldPassWord) {
      alert('Please enter your password')
      return
    }
    dispatch(UpdateUserProfileAction({ newPassWord, oldPassWord }))
  }

  if (loading === 'loading') {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input inputStyle={styles.input} placeholder="Password" value={oldPassWord} onChangeText={setOldPassWord} />
        <Input placeholder="New Password" value={newPassWord} onChangeText={setNewPassWord} inputStyle={styles.input} />
      </View>
      <TouchableOpacity
        onPress={() => nav.navigate('ForgotPasswordScreen')}
        style={{
          width: '90%',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            textDecorationLine: 'underline',
            color: '#000',
          }}
        >
          Forgot Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change</Text>
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
