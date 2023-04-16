import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native'
import React, { FC, useMemo, useState } from 'react'
import { IApplication, IDevice } from '../constants/interface'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types'
import { useAppDispatch, useAppSelector } from '../app/hook'

interface IAppProps {
  app: IApplication
  deviceId: number
}

export const Application: FC<IAppProps> = ({ app, deviceId }) => {
  const nav = useNavigation()
  const [visible, setVisible] = useState(false)

  const btnChartUsage = () => {
    nav.navigate('ChartUsageScreen', { app })
    setVisible(false)
  }

  const btnCalendar = () => {
    nav.navigate('CalendarScreen', { app, deviceId })
    setVisible(false)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={styles.container}>
          <View style={styles.item}>
            <Image source={{ uri: app.image }} style={styles.image} />
            <Text style={styles.name}>{app.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.contentModal}>
            <TouchableOpacity style={styles.btnCustom} onPress={btnChartUsage}>
              <Text style={styles.name}>Time usage this week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCustom} onPress={btnCalendar}>
              <Text style={styles.name}>Set limit time usage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCustom} onPress={() => setVisible(false)}>
              <Text style={styles.name}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export const ListApplicationCard: FC<RootStackScreenProps<'ApplicationScreen'>> = ({ navigation, route }) => {
  const device = route.params.device

  const [apps, setApps] = React.useState<IApplication[]>([])

  useMemo(() => {
    if (device && device.applications) {
      setApps(device.applications)
    }
  }, [device])

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={apps}
        renderItem={({ item, index }) => <Application app={item} key={index} deviceId={device.id || 1} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnCustom: {
    borderBottomColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    width: 200,
    alignItems: 'center',
    borderRadius: 20,
  },
  contentModal: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 300,
  },

  container: {
    marginTop: 10,
    flex: 1,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    flexWrap: 'wrap-reverse',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },

  body: {
    marginBottom: 50,
  },

  image: {
    height: 125,
    // width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    resizeMode: 'contain',
    marginRight: 30,
  },
})
