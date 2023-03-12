import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import { Picker } from '@react-native-picker/picker'
import { GoogleMap, GoogleMapState } from './GoogleMap'
import { formColor, grayColor, mainColor, primaryColor, whiteColor } from '../constants/Colors'
import React, { FC, useEffect, useRef, useState } from 'react'
import { AntDesign, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { EmploymentType, ExpLevel, ICareer } from '../constants/interface'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { SearchJobAction, selectJobs, selectLoading, selectSearchedJobs } from '../reducers/jobSlice'
import SplashScreen from '../screens/SplashScreen'
import { useNavigation } from '@react-navigation/native'
import { GetAllCareerAction, selectCareers } from '../reducers/careerSlice'
import Layout from '../constants/Layout'
export interface IJob {
  id: string
  name: string
}

interface ItemProps {
  item: IJob
}

interface IModalPopupFilterProps {
  modalVisible: boolean
  setModalVisible: Function
}

const listFilter: IJob[] = [
  {
    id: '1',
    name: 'Programming',
  },
  {
    id: '2',
    name: 'Design',
  },
  {
    id: '3',
    name: 'Marketing',
  },
  {
    id: '4',
    name: 'Sales',
  },
]

const ModalPopupFilter: FC<IModalPopupFilterProps> = ({ modalVisible, setModalVisible }) => {
  const nav = useNavigation()
  const dispatch = useAppDispatch()

  const jobs = useAppSelector(selectSearchedJobs)

  const [modalCareerVisible, setModalCareerVisible] = useState(false)
  const [keywordCareer, setKeyWordCareer] = useState('')
  const [idCareer, setIdCareer] = useState<number | undefined>()
  const careerData = useAppSelector(selectCareers)
  const [careerList, setCareerList] = useState<ICareer[] | undefined>(careerData)
  const dataCareerCompact = useAppSelector(selectCareers)?.filter((e) => e.parent == null)
  const dataCareerChild = useAppSelector(selectCareers)?.filter((e) => e.parent != null)
  const [careersPick, setCareersPick] = useState<{ name: string; id: number }[]>([])
  const [careersId, setcareersId] = useState<number[]>([])
  const [startSalary, setStartSalary] = useState<string>('0')
  const [endSalary, setEndSalary] = useState<string>('2000')

  const [rangeMetter, setRangeMetter] = useState<string>('')
  const [modalLocation, setModalLocation] = useState(false)
  const [employmentSelect, setEmploymentSelect] = useState<EmploymentType>(EmploymentType.FullTime)
  const [levelSelect, setLevelSelect] = useState<ExpLevel>(ExpLevel.NoExp)
  const [location, setLocation] = useState<GoogleMapState>({
    latitude: 20.980194953622984,
    longitude: 105.79615346430842,
  })

  const [employment_type, setEmployment_type] = useState<EmploymentType[]>([])
  const [levelArr, setLevelArr] = useState<ExpLevel[]>([])
  const showResult = () => {
    if (!location) {
      alert('Please choose location')
      return
    }
    // if (!rangeMetter) {
    //   alert('Please choose range metter')
    //   return
    // }
    dispatch(
      SearchJobAction({
        careers: careersId,
        levels: levelArr,
        jobTypes: employment_type,
        lat: location.latitude,
        lng: location.longitude,
        range: +rangeMetter,
        page: 1,
        startSalary: +startSalary,
        endSalary: +endSalary,
      }),
    )
    nav.navigate('SearchResult')
    setModalVisible(false)
  }

  // Modal Career
  const fillterCareerList = (key: string) => {
    setCareerList(dataCareerCompact?.filter((e) => e.name.includes(key)))
  }
  useEffect(() => {
    fillterCareerList(keywordCareer)
  }, [keywordCareer])

  useEffect(() => {
    dispatch(GetAllCareerAction())
  }, [])

  const checkParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)[0] ? true : false
  }
  const findParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)
  }

  const typeEmployee = Object.keys(EmploymentType).map((name) => {
    return {
      name,
      value: EmploymentType[name as keyof typeof EmploymentType],
    }
  })
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.centeredView}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.filter}>
              <View style={styles.header}>
                <Text style={styles.title}>Lọc tìm kiếm</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ ...styles.title, color: primaryColor, fontSize: 18 }}>Quay lại</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fieldFilter}>
                <Text style={{ ...styles.title, fontSize: 18, marginBottom: 15 }}>Loại hình</Text>
                {employment_type.length != 0 ? (
                  <View
                    style={{
                      // marginBottom: 15,
                      flexDirection: 'row',
                      maxWidth: Layout.window.width,
                      flexWrap: 'wrap',
                    }}
                  >
                    {employment_type.map((e) => (
                      <TouchableOpacity
                        onPress={() => {
                          setEmployment_type(employment_type.filter((element) => element != e))
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: '#2196F3',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            height: 40,
                            marginRight: 10,
                            marginBottom: 10,
                          }}
                        >
                          <Text style={{ color: whiteColor }}>{e}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
                <View style={styles.inputFilter}>
                  <Picker
                    style={{ flex: 1 }}
                    selectedValue={employmentSelect}
                    onValueChange={(itemValue) => {
                      if (employment_type.filter((e) => e == itemValue).length == 0)
                        setEmployment_type([...employment_type, itemValue])
                      // else alert('Bạn đã chọn loại hình này rồi !')
                    }}
                  >
                    {typeEmployee.map((e) => (
                      <Picker.Item label={e.name} value={e.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <Text style={{ ...styles.title, fontSize: 18, marginBottom: 15 }}>Vị trí ứng tuyển</Text>
                {careersPick && careersPick.length != 0 ? (
                  <View
                    style={{
                      // marginBottom: 15,
                      flexDirection: 'row',
                      maxWidth: Layout.window.width,
                      flexWrap: 'wrap',
                    }}
                  >
                    {careersPick.map((e) => (
                      <TouchableOpacity
                        onPress={() => {
                          setCareersPick(careersPick.filter((element) => element.id != e.id))
                          setcareersId(careersId?.filter((element) => element != e.id))
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: mainColor,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            height: 40,
                            marginRight: 10,
                            marginBottom: 10,
                          }}
                        >
                          <Text style={{ color: whiteColor }}>{e.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <></>
                )}

                <TextInput
                  editable={false}
                  // value={career}
                  onPressIn={() => {
                    setModalCareerVisible(true)
                    setKeyWordCareer('')
                  }}
                  placeholderTextColor={formColor}
                  placeholder="Vị trí công việc"
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Năm kinh nghiệm</Text>
                  {levelArr.length != 0 ? (
                    <View
                      style={{
                        // marginBottom: 15,
                        flexDirection: 'row',
                        maxWidth: Layout.window.width,
                        flexWrap: 'wrap',
                      }}
                    >
                      {levelArr.map((e) => (
                        <TouchableOpacity
                          onPress={() => {
                            setLevelArr(levelArr.filter((element) => element != e))
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              backgroundColor: '#F7DC6F',
                              borderRadius: 20,
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                              height: 40,
                              marginRight: 10,
                              marginBottom: 10,
                            }}
                          >
                            <Text style={{ color: whiteColor }}>{e}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <></>
                  )}
                  <View style={styles.inputFilter}>
                    <Picker
                      selectedValue={levelSelect}
                      onValueChange={(itemValue, itemIndex) => {
                        if (levelArr.filter((e) => e == itemValue).length == 0) setLevelArr([...levelArr, itemValue])
                      }}
                      style={{ flex: 1 }}
                    >
                      {Object.keys(ExpLevel).map((item, index) => (
                        <Picker.Item label={item} value={Object.values(ExpLevel)[index]} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Lương mong muốn (1 tháng-đơn vị $)</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <TextInput
                      placeholder="Thấp nhất"
                      value={startSalary}
                      onChangeText={setStartSalary}
                      keyboardType="numeric"
                      placeholderTextColor={formColor}
                      style={{ height: 40, width: 130, borderWidth: 0.3, borderRadius: 10, paddingHorizontal: 10 }}
                    ></TextInput>
                    <AntDesign name="arrowright" size={24} color="black" style={{ marginTop: 7 }} />
                    <TextInput
                      placeholder="Cao nhất"
                      value={endSalary}
                      onChangeText={setEndSalary}
                      keyboardType="numeric"
                      placeholderTextColor={formColor}
                      style={{ height: 40, width: 130, borderWidth: 0.3, borderRadius: 10, paddingHorizontal: 10 }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Vị trí</Text>
                  <Text>
                    Longtitue: {location.longitude} - Latitude: {location.latitude}
                  </Text>
                  <TouchableOpacity onPress={() => setModalLocation(true)}>
                    <View style={{ ...styles.inputFilter, padding: 15 }}>
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Feather name="map-pin" style={{ color: '#000000' }} size={16} />
                        <Text style={{ ...styles.text, marginLeft: 10 }}>{'Select location'}</Text>
                      </View>
                      <View>
                        <MaterialIcons
                          name="location-searching"
                          style={{ color: '#000000', fontWeight: '500' }}
                          size={16}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Bán kính (km)</Text>
                  <View style={styles.inputFilter}>
                    <TextInput
                      onChangeText={setRangeMetter}
                      value={rangeMetter}
                      keyboardType="numeric"
                      style={{ padding: 10, minWidth: '100%' }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              {/* <View style={styles.fieldFilter}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ ...styles.title, fontSize: 18 }}>Salary</Text>
                  <Text style={{ ...styles.text, color: primaryColor }}>Month</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ ...styles.inputFilter, flex: 1, marginRight: 10 }}>
                    <Feather name="dollar-sign" style={{ color: '#000000', fontWeight: '500' }} size={16} />
                    <TextInput style={{ width: '100%' }} keyboardType="numeric" placeholder="Min" />
                  </View>
                  <View style={{ ...styles.inputFilter, flex: 1, marginLeft: 10 }}>
                    <Feather name="dollar-sign" style={{ color: '#000000', fontWeight: '500' }} size={16} />
                    <TextInput style={{ width: '100%' }} keyboardType="numeric" placeholder="Max" />
                  </View>
                </View>
              </View> */}

              <View
                style={{
                  ...styles.fieldFilter,
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  display: 'flex',
                }}
              >
                <Button
                  title={'Tìm kiếm'}
                  buttonStyle={{
                    width: 200,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: '#000000',
                  }}
                  onPress={() => showResult()}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <GoogleMap
          modalLocation={modalLocation}
          setModalLocation={setModalLocation}
          location={location}
          setLocation={setLocation}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCareerVisible}
        onRequestClose={() => {
          setModalCareerVisible(!modalCareerVisible)
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => {
                setModalCareerVisible(false)
              }}
            >
              <MaterialIcons name="arrow-back-ios" size={30} color={mainColor} />
            </TouchableOpacity>
            <TextInput
              // autoFocus={true}
              placeholder="Nhập vào từ khóa"
              placeholderTextColor={formColor}
              value={keywordCareer}
              onChangeText={setKeyWordCareer}
            ></TextInput>
          </View>
          <View style={styles.list}>
            <ScrollView>
              {careerList &&
                careerList.map((e, key) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (checkParent(e.id)) {
                          setIdCareer(e.id)
                        } else {
                          setKeyWordCareer(e.name)
                          if (careersId?.filter((el) => el == e.id).length == 0) {
                            careersPick
                              ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                              : setCareersPick([{ name: e.name, id: e.id }])
                            careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                            console.log(careersId)
                            setModalCareerVisible(false)
                          } else if (careersId) {
                            console.log(careersId)
                            alert('Bạn đã chọn vị trí này rồi!')
                          }
                        }
                      }}
                    >
                      <View>
                        <View style={styles.itemModalCareer} key={key}>
                          <Text style={{ fontSize: 18 }}>{e.name}</Text>
                          {checkParent(e.id) ? (
                            <View
                              style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                backgroundColor: mainColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text style={{ color: whiteColor }}>{findParent(e.id)?.length}</Text>
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                    {e.id == idCareer && checkParent(e.id) && (
                      <TouchableOpacity
                        onPress={() => {
                          setKeyWordCareer(e.name)
                          if (careersId?.filter((el) => el == e.id).length == 0) {
                            careersPick
                              ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                              : setCareersPick([{ name: e.name, id: e.id }])
                            careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                            // console.log(careersId)
                            setModalCareerVisible(false)
                          } else if (careersId) {
                            // console.log(careersId)
                            alert('Bạn đã chọn vị trí này rồi!')
                          }
                        }}
                      >
                        <View style={styles.itemChild} key={key}>
                          <Text style={{ fontSize: 18 }}>{e.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    {e.id == idCareer &&
                      findParent(e.id)?.map((e) => (
                        <TouchableOpacity
                          onPress={() => {
                            setKeyWordCareer(e.name)
                            if (careersId?.filter((el) => el == e.id).length == 0) {
                              careersPick
                                ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                                : setCareersPick([{ name: e.name, id: e.id }])
                              careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                              console.log(careersId)
                              setModalCareerVisible(false)
                            } else if (careersId) {
                              console.log(careersId)
                              alert('Bạn đã chọn vị trí này rồi!')
                            }
                          }}
                        >
                          <View style={styles.itemChild} key={key}>
                            <Text style={{ fontSize: 18 }}>{e.name}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Modal>
  )
}

const Item: FC<ItemProps> = ({ item }) => {
  const [listSelected, setListSelected] = React.useState<string[]>([])
  const handleSelected = (id: string) => {
    if (listSelected.includes(id)) {
      setListSelected(listSelected.filter((item) => item !== id))
    } else {
      setListSelected([...listSelected, id])
    }
  }

  return (
    <TouchableOpacity onPress={() => handleSelected(item.id)}>
      {listSelected.includes(item.id) ? (
        <View style={{ ...styles.item, backgroundColor: primaryColor }}>
          <Text style={{ ...styles.text, color: '#FFFFFF' }}>{item.name}</Text>
        </View>
      ) : (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

interface IFilterProps {}

export const Filter: FC<IFilterProps> = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.icon}>
          <Feather name="filter" size={25} />
        </View>
      </TouchableOpacity>
      {modalVisible && <ModalPopupFilter modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      <View style={styles.listItem}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={listFilter}
          renderItem={({ item, index }) => <Item item={item} key={index} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '200',
    paddingHorizontal: 15,
    borderColor: formColor,
  },
  itemChild: {
    paddingHorizontal: 40,
    borderBottomWidth: 0.2,
    backgroundColor: grayColor,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  list: {},
  itemModalCareer: {
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  top: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  modalView: {
    paddingTop: 55,
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: whiteColor,
  },
  container: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: '#FDFDFD',
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  listItem: {
    flex: 1,
  },
  item: {
    minWidth: 45,
    minHeight: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 15,
    paddingLeft: 12,
    paddingRight: 12,
    pađingTop: 5,
    paddingBottom: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  text: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },

  centeredView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
  },
  filter: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 80,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 38,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },

  fieldFilter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },

  inputFilter: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#E5E5E5',
    borderWidth: 0.5,
    marginTop: 15,
    justifyContent: 'space-between',
  },
})
