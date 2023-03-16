import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { FC } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { primaryColor } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { levelMapping } from '../constants/enum-mapping'
import { IDevice } from '../constants/interface'
const width = Dimensions.get('window').width

interface IDeviceProps {
  device: IDevice
}
export const Device: FC<IDeviceProps> = ({ device }) => {
  const nav = useNavigation()

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image source={{ uri: device.image }} style={styles.image} />
          <Text style={styles.name}>{device.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

interface IListDeviceCardProps {}
export const ListDeviceCard: FC<IListDeviceCardProps> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            name: 'Thiết bị 1',
            image: 'https://cdn-icons-png.flaticon.com/512/49/49672.png',
          },
        ]}
        renderItem={({ item, index }) => <Device device={item} key={index} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
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
