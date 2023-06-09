import {
  Button,
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
import * as ImagePicker from 'expo-image-picker'
import { Input } from '@rneui/base'
import { uploadImage } from '../../app/cloudinary'
const width = Dimensions.get('window').width
export default function SignUpScreen() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [image, setImage] = useState(
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  )
  const handleRegister = () => {
    if (!email || !password || !confirm) {
      alert('Please fill all fields')
      return
    }
    if (password !== confirm) {
      alert('Password and confirm password must be the same')
      return
    }

    if (emailRegex.test(email) === false) {
      alert('Please enter a valid email')
      return
    }

    dispatch(registerAction({ name, email, password, image }))
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })

    if (!result.cancelled) {
      const { secure_url: newImageUrl } = await uploadImage(result)
      setImage(newImageUrl)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Input inputStyle={styles.input} placeholder="Username" value={name} onChangeText={setName} />
        <Input
          inputStyle={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
        />
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
        <View style={styles.formImage}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: '#000000',
            }}
            onPress={pickImage}
          >
            <Text
              style={{
                ...styles.buttonText,
                width: 100,
                textAlign: 'center',
                alignItems: 'center',
                height: 15,
                padding: 0,
                fontSize: 12,
              }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>

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
  formImage: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    // marginTop: 20,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: 100,
    // alignItems: 'center',
    resizeMode: 'contain',
    borderEndWidth: 0.25,
    borderRadius: 6,
  },
})
