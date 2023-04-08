import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import React, { useState } from 'react'
import dayjs from 'dayjs'

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

export const CalendarScreen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  )
}

const styles = StyleSheet.create({})
