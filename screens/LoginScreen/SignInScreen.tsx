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
} from 'react-native'
import React, { useState } from 'react'
import { blackColor, whiteColor } from '../../constants/Colors'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../app/hook'
import { loginAction } from '../../reducers/authSlice'
const width = Dimensions.get('window').width
export default function SignInScreen() {
  const [email, setEmail] = useState('daclip26@gmail.com')
  const [password, setPassword] = useState('12345')
  const nav = useNavigation()
  const [showPass, setShowPass] = useState(true)
  const dispatch = useAppDispatch()
  const onSubmit = () => {
    dispatch(loginAction({ email, password }))
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <View style={styles.header__icon}>
            <Ionicons name='chevron-back-outline' size={30} color='black' />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            left: -15,
          }}
        >
          <Text style={styles.header__title}>Sign In</Text>
        </View>
      </View> */}
        <View
          style={{
            width: 560,
            height: 310,
            alignSelf: 'center',
            borderBottomLeftRadius: 560,
            borderBottomRightRadius: 560,
            // borderBottomColor: '#000',
            // borderBottomWidth: 10,
            // overflow: 'hidden',
          }}
        >
          <Image
            source={require('../../assets/images/login-BG.png')}
            resizeMode="cover"
            style={{
              alignSelf: 'center',
              // top: 100,
              width: 550,
              height: 300,
              resizeMode: 'cover',
              borderBottomLeftRadius: 275,
              borderBottomRightRadius: 275,
              // borderWidth: 2,
              // borderColor: '#000',
            }}
          />
        </View>
        <View style={styles.view__title}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.note}>Login to your account</Text>
        </View>
        <View style={styles.form__field}>
          <FontAwesome name="user" size={24} color="#4B6587" style={{ marginHorizontal: 15 }} />
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
        <TouchableOpacity>
          <View style={styles.forgot}>
            <Text
              style={{
                color: '#ECF0F1',
              }}
            >
              Forgot Password?
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ bottom: 50, position: 'absolute', width: width }}>
          <TouchableOpacity onPress={() => onSubmit()}>
            <View style={styles.form__submit}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: whiteColor }}>Login</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              // flex: 1,
              justifyContent: 'center',
              marginTop: 15,
            }}
          >
            <Text style={{ color: whiteColor, fontSize: 15 }}>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
                <Text
                  style={{
                    color: whiteColor,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                  }}
                >
                  Sign up
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
    backgroundColor: '#576CD6',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    width: width,
    marginTop: 35,
    height: 60,
  },
  header__title: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  header__icon: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 55,
    color: whiteColor,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: width,
    // flexDirection: 'row',
  },
  note: {
    marginTop: 10,
    marginBottom: 30,
    color: whiteColor,
    fontSize: 20,
  },
  view__title: {
    flexDirection: 'column',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
