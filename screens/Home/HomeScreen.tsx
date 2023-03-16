import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListDeviceCard } from '../../components/ListDeviceCard'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ListDeviceCard />
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
