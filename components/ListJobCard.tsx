import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React, { FC } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { primaryColor } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { ExpLevel, IJob } from '../constants/interface'
import { levelMapping } from '../constants/enum-mapping'
const width = Dimensions.get('window').width

interface IJobProps {
  job: IJob
}
export const Job: FC<IJobProps> = ({ job }) => {
  const nav = useNavigation()

  return (
    <TouchableOpacity onPress={() => nav.navigate('JobDetailScreen', { id: job.id })}>
      <View style={styles.job}>
        <View style={styles.companyHeader}>
          <View style={styles.logo}>
            <Image
              source={{
                uri: job.company.avatar,
              }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
            />
          </View>
          <View style={styles.infoCompany}>
            <Text style={styles.nameJob}>{job.title}</Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text style={styles.address}>{job.company.name}</Text>
              <Text style={styles.salary}>${job.maxSalary}/Mo</Text>
            </View>
          </View>
        </View>
        <View style={styles.jobDetail}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name="map-pin" size={18} style={{ marginRight: 5 }} color="#6E6D7A" />
              <Text style={styles.address}>{job.location}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 30,
              }}
            >
              <Feather name="briefcase" size={18} style={{ marginRight: 5 }} color="#6E6D7A" />
              <Text style={styles.address}>{levelMapping[job.level] || ''}</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="fiber-manual-record" />
            <Text>{job.startDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

interface IListJobCardProps {
  title?: string
  data: IJob[]
  page: number
  setPage: (page: number) => void
  reload?: () => void
}
export const ListJobCard: FC<IListJobCardProps> = ({ title, data, page, setPage, reload }) => {
  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title ? title : 'Suggested Job'}</Text>
        <Pressable onPress={() => reload?.()}>
          <MaterialIcons name="more-horiz" size={26} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString() + item.id}
          renderItem={({ item, index }) => <Job job={item} key={index} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.25}
          onEndReached={() => nextPage()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  job: {
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  body: {
    marginBottom: 50,
  },
  companyHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  infoCompany: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
  },
  nameJob: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  address: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6E6D7A',
  },
  jobDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {},
  salary: {
    fontSize: 18,
    fontWeight: '500',
    color: `${primaryColor}`,
    textAlign: 'right',
  },
})
