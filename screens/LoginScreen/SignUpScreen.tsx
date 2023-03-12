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
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../app/hook'
import { registerAction } from '../../reducers/authSlice'
const width = Dimensions.get('window').width
export default function SignUpScreen() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const nav = useNavigation()
  const [showPass, setShowPass] = useState(true)
  const [showCPass, setShowCPass] = useState(true)
  const [showNoti, setShowNoti] = useState(false)
  const [noti, setNoti] = useState('')

  const dispatch = useAppDispatch()
  const validateForm = () => {
    setNoti('')
    setShowNoti(false)
    let isError = false
    if (email.length == 0) {
      setNoti('Email không được để trống !')
      setShowNoti(true)
      isError = true
    }
    if (name.length == 0) {
      setNoti('Username không được để trống !')
      setShowNoti(true)
      isError = true
    }
    if (password.length < 5) {
      setNoti('Mật khẩu phải từ 5 kí tự trở lên !')
      setShowNoti(true)
      isError = true
    }
    if (password !== cPassword) {
      setNoti('Mật khẩu không trùng!')
      setShowNoti(true)
      isError = true
    }
    return isError
  }
  const submit = () => {
    const err = validateForm()
    console.log(err)
    !err && dispatch(registerAction({ email, password, name }))
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/signup.png')}
          resizeMode="center"
          style={{
            width: 350,
            height: 300,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 55,
            color: whiteColor,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            color: whiteColor,
            marginBottom: 20,
          }}
        >
          Create your account
        </Text>
        <View style={styles.form__field}>
          <Entypo name="email" size={20} color="#4B6587" style={{ marginHorizontal: 11 }} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#4B6587"
            keyboardType="default"
          />
        </View>
        <View style={styles.form__field}>
          <FontAwesome name="user" size={24} color="#4B6587" style={{ marginHorizontal: 13 }} />
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Username"
            placeholderTextColor="#4B6587"
            keyboardType="default"
          />
        </View>
        <View style={styles.form__field}>
          <FontAwesome name="lock" size={24} color="#4B6587" style={{ marginHorizontal: 15 }} />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#4B6587"
            keyboardType="default"
            secureTextEntry={showPass}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                width: 40,
                alignItems: 'center',
              }}
            >
              {showPass ? (
                <Entypo name="eye" size={24} color="#4B6587" />
              ) : (
                <Entypo name="eye-with-line" size={24} color="#4B6587" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.form__field}>
          <FontAwesome name="lock" size={24} color="#4B6587" style={{ marginHorizontal: 15 }} />
          <TextInput
            style={styles.input}
            onChangeText={setCPassword}
            value={cPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#4B6587"
            keyboardType="default"
            secureTextEntry={showCPass}
          />
          <TouchableOpacity onPress={() => setShowCPass(!showCPass)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                width: 40,
                alignItems: 'center',
              }}
            >
              {showCPass ? (
                <Entypo name="eye" size={24} color="#4B6587" />
              ) : (
                <Entypo name="eye-with-line" size={24} color="#4B6587" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {showNoti ? <Text style={{ marginLeft: 50, marginTop: 20, color: '#FF8B8B' }}>{noti}</Text> : ''}
        <View style={{ bottom: 50, position: 'absolute', width: width }}>
          <TouchableOpacity onPress={() => submit()}>
            <View style={styles.form__submit}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: whiteColor }}>Register</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              //   flex: 1,
              justifyContent: 'center',
              marginTop: 15,
            }}
          >
            <Text style={{ color: whiteColor, fontSize: 15 }}>
              Already have an account?{' '}
              <TouchableOpacity onPress={() => nav.navigate('Home')}>
                <Text
                  style={{
                    color: whiteColor,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#576CD6',
  },
  input: {
    fontSize: 20,
    height: 50,
    flexDirection: 'row',
    flex: 1,
  },
  form__field: {
    marginTop: 20,
    marginHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2DAFF',
    // paddingHorizontal: 20,
    borderRadius: 10,
  },
  forgot: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginRight: 50,
    // justifyContent: 'flex-end',
  },
  form__submit: {
    marginTop: 130,
    marginHorizontal: 50,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#B1B2FF',
    // paddingHorizontal: 20,
    borderRadius: 25,
  },
})
