import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { primaryColor } from '../constants/Colors'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { IDevice } from '../constants/interface'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { getDeviceByMeAction, selectDevices } from '../reducers/deviceSlice'
import { Icon } from '@rneui/base'

interface IDeviceProps {
  device: IDevice
}
export const Device: FC<IDeviceProps> = ({ device }) => {
  const nav = useNavigation()
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={() => nav.navigate('ApplicationScreen', { device })}>
        <View style={styles.item}>
          <Image source={{ uri: device.image }} style={styles.image} />
          <Text style={styles.name}>{device.name}</Text>
        </View>
      </TouchableOpacity>
      <FontAwesome5 name="ellipsis-v" size={28} color="#333333" onPress={() => setVisible(true)} />
      <PopUpDevice visible={visible} setVisible={setVisible} device={device} navigation={nav} />
    </View>
  )
}

interface IListDeviceCardProps {}
export const ListDeviceCard: FC<IListDeviceCardProps> = () => {
  const [devices, setDevices] = React.useState<IDevice[]>([])
  const data = useAppSelector(selectDevices)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getDeviceByMeAction())
  }, [])

  useMemo(() => {
    if (data) {
      setDevices(data)
    }
  }, [data])

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={devices}
        renderItem={({ item }) => <Device device={item} key={item.token} />}
      />
    </View>
  )
}

interface IPopUpDeviceProps {
  visible: boolean
  setVisible: (value: boolean) => void
  navigation: NavigationProp<ReactNavigation.RootParamList>
  device: IDevice
}

export const PopUpDevice: FC<IPopUpDeviceProps> = ({ setVisible, visible, device, navigation }) => {
  const btnUpdate = () => {
    setVisible(false)
    navigation.navigate('EditDeviceScreen', { device })
  }

  return (
    <Modal visible={visible}>
      <View style={styles.popupBackGroup}>
        <View style={styles.popupContent}>
          <TouchableOpacity style={styles.itemPopUp} onPress={btnUpdate}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemPopUp}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.itemPopUp, borderBottomWidth: 0 }} onPress={() => setVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupBackGroup: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  itemPopUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  container: {
    marginTop: 10,
    flex: 1,
  },
  containerItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
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
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    resizeMode: 'contain',
    marginRight: 30,
  },
})
