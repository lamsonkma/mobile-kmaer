import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { FC } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { ICompany, IJob, IWorkplace } from '../constants/interface'
import { useNavigation } from '@react-navigation/native'

interface IComPanyProps {
  item: ICompany
}

const Company: FC<IComPanyProps> = ({ item }) => {
  const nav = useNavigation()
  const typeWork = new Map()
  Object.keys(IWorkplace).map((name) => {
    typeWork.set(IWorkplace[name as keyof typeof IWorkplace], name)
  })
  return (
    <View style={styles.company}>
      <View style={styles.companyHeader}>
        <View style={styles.logo}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
          />
        </View>
        <View style={styles.infoCompany}>
          <Text style={styles.nameCompany}>{item.name}</Text>
          <Text style={styles.address}>{item.address?.split(',').slice(-1)}</Text>
        </View>
      </View>

      <View style={styles.button}>
        <Button
          buttonStyle={{
            backgroundColor: '#000000',
            borderRadius: 10,
          }}
          onPress={() => {
            nav.navigate('CompanyList', { id: item.id })
          }}
        >
          Danh sách công việc
        </Button>
      </View>
    </View>
  )
}

interface IPropTopCompany {
  companies: ICompany[]
  page: number
  setPage: (page: number) => void
}
export const TopCompany: FC<IPropTopCompany> = ({ companies, page, setPage }) => {
  const nextPage = () => {
    setPage(page + 1)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Các công ty hàng đầu</Text>
        <MaterialIcons name="more-horiz" size={26} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={companies}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item, index }) => <Company item={item} key={index} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  company: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    borderWidth: 0.25,
    borderColor: '#E5E5E5',
    minWidth: 250,
    marginRight: 10,
  },
  companyHeader: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  nameCompany: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  address: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6E6D7A',
  },
  infoCompany: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  infoJob: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6F6F6F',
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    marginTop: 15,
  },
})
