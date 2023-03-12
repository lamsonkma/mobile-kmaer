import { Animated, Dimensions, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

const width = Dimensions.get('window').width
export default function RootScreen() {
  const nav = useNavigation()

  const [FontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (FontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [FontsLoaded])

  if (!FontsLoaded) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <ImageBackground
        source={image}
        resizeMode='cover'
        style={{ ...styles.image }}
      > */}
      <Animated.View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            alignSelf: 'center',
            // top: 100,

            width: 150,
            height: 150,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 50, fontWeight: '500' }}>KMAER</Text>
      </View>
      <View style={styles.form}>
        <TouchableOpacity onPress={() => nav.navigate('SignIn')}>
          <View style={styles.form__field}>
            <Text style={styles.form__text}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
          <View style={styles.form__field}>
            <Text style={styles.form__text}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View>
          <Text>LoginScreen</Text>
          <Text>LoginScreen</Text>
        </View> */}
      {/* </ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 200,
    fontFamily: 'SpaceMono-Regular',
  },
  image: {
    flex: 1,
    paddingTop: 200,
  },
  logo: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: width,
    // top: 100,
    height: 150,
  },
  form: {
    marginTop: 80,
  },
  form__field: {
    backgroundColor: '#000',
    width: 250,
    marginTop: 20,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form__text: {
    color: '#fff',
    fontSize: 20,
  },
})
