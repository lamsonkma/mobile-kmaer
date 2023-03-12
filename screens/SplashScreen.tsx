import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { RootTabScreenProps } from '../types'
import LottieView from 'lottie-react-native'
import { mainColor, whiteColor } from '../constants/Colors'
import Layout from '../constants/Layout'

//TODO: make spinner
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* <Image
        source={{
          uri: 'https://www.artnews.com/wp-content/uploads/2020/04/Large-KM-108.488-Vincent-van-Gogh-Landweg-in-de-Provence-bij-nacht-circa-12-15-mei-1890-Country-road-in-Provence-by-night-circa-12-15-May-1890.jpg?w=1024',
        }}
        style={{
          position: 'relative',
          height: Layout.window.height,
          width: Layout.window.width,
        }}
      /> */}
      <LottieView
        style={{ position: 'absolute' }}
        source={require('../assets/intro/94295-loading-animation.json')}
        autoPlay
        loop
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    opacity: 0.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
