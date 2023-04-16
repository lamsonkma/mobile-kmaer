import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { useNavigation } from '@react-navigation/native'
import {
  ForgotPasswordAction,
  VerifyOtpAction,
  selectIsChangePassword,
  selectIsForgotPassword,
} from '../../reducers/userSlice'

export const ForgotPasswordScreen = () => {
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [otp, setOTP] = useState('')
  const [showOTPInput, setShowOTPInput] = useState(false)
  const isForgotPassword = useAppSelector(selectIsForgotPassword)
  const isChangePassword = useAppSelector(selectIsChangePassword)
  const sendOTP = () => {
    if (!email) {
      Alert.alert('Please enter your email')
      return
    }
    dispatch(ForgotPasswordAction({ email }))
    setShowOTPInput(true)
  }

  useMemo(() => {
    if (isForgotPassword) {
      setShowOTPInput(true)
    }
  }, [isForgotPassword])

  useMemo(() => {
    if (isChangePassword) {
      nav.navigate('NewPassWordScreen')
    }
  }, [isChangePassword])

  const verifyBtn = () => {
    if (!otp) {
      Alert.alert('Please enter your OTP')
      return
    }
    dispatch(VerifyOtpAction({ email, otp }))
  }

  return (
    <View style={styles.container}>
      {!showOTPInput ? (
        <>
          <Text style={styles.subtitle}>Please enter your email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Token has been sent to your email, please check your mailbox (code is valid for up to 5 minutes)
          </Text>
          <TextInput style={styles.input} value={otp} onChangeText={setOTP} />
          <TouchableOpacity style={styles.button} onPress={verifyBtn}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
    borderColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
