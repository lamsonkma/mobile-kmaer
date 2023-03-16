import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native'
import React, { useState } from 'react'
import { blackColor, whiteColor } from '../../constants/Colors'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../app/hook'
import { loginAction } from '../../reducers/authSlice'
import { Input } from '@rneui/base'

const width = Dimensions.get('window').width
export default function SignInScreen() {
  const navigator = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}`)
    // Xử lý logic đăng nhập tại đây
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
          secureTextEntry={!showPassword}
          inputStyle={styles.input}
          rightIcon={<Ionicons name="eye" size={24} color="black" onPress={() => setShowPassword(!showPassword)} />}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigator.navigate('ForgotPassword')}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
