import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { FC, useMemo } from 'react'
import { IApplication } from '../constants/interface'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '../types'
import { useAppDispatch, useAppSelector } from '../app/hook'

interface IAppProps {
  app: IApplication
}

export const Application: FC<IAppProps> = ({ app }) => {
  const nav = useNavigation()

  return (
    <TouchableOpacity onPress={() => nav.navigate('ChartUsageScreen',{app})}>
      <View style={styles.container}>
        <View style={styles.item}>
          <Image source={{ uri: app.image }} style={styles.image} />
          <Text style={styles.name}>{app.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  
}

export const ListApplicationCard: FC<RootStackScreenProps<"ApplicationScreen">> = ({navigation,route}) => {
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
        renderItem={({ item, index }) => <Application app={item} key={index} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
