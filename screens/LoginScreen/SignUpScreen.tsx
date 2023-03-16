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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleRegister = () => {
    // Xử lý logic đăng kí tại đây
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Input inputStyle={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
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
