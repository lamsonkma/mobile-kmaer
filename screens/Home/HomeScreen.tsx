import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function HomeScreen() {
  

  return (
    <View style={styles.container}>
      <Text>
        Đây là home
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FDFDFD',
  },
})
