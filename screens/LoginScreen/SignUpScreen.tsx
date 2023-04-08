import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { whiteColor } from '../../constants/Colors'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../app/hook'
import { registerAction } from '../../reducers/authSlice'
import { Input } from '@rneui/base'
const width = Dimensions.get('window').width
export default function SignUpScreen() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleRegister = () => {
    if(!email || !password || !confirm){
      alert('Please fill all fields')
      return
    }
    if(password !== confirm){
      alert('Password and confirm password must be the same')
      return
    }

    if(emailRegex.test(email) === false){
      alert('Please enter a valid email')
      return
    }

    dispatch(registerAction({ name, email, password }))
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Input inputStyle={styles.input} placeholder="Username" value={name} onChangeText={setName} />
        <Input inputStyle={styles.input} placeholder="Email" value={email} onChangeText={setEmail} textContentType="emailAddress"  />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          inputStyle={styles.input}
        />
        <Input
          placeholder="Confirm"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          inputStyle={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
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
