import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export const ForgotPasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOTP] = useState('')
  const [showOTPInput, setShowOTPInput] = useState(false)

  const sendOTP = () => {
    setShowOTPInput(true)
  }

  const verifyOTP = () => {}

  return (
    <View style={styles.container}>
      {!showOTPInput ? (
        <>
          <Text style={styles.subtitle}>Enter your phone number to retrieve your password</Text>
          <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
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
          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
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
