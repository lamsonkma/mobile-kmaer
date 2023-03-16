import { Button, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { RootStackScreenProps } from '../types'

export const ScanQrCode: React.FC<RootStackScreenProps<'ScanQrCode'>> = ({ route, navigation }) => {
  const { setToken } = route.params
  const [hasPermission, setHasPermission] = useState<boolean>()
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }: Record<'type' | 'data', string>) => {
    setScanned(true)
    setToken(data)
    navigation.goBack()
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
