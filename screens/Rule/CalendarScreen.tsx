import { Alert, Modal, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import DropDownPicker from 'react-native-dropdown-picker'
import { Button, Input } from '@rneui/base'
import { RootStackScreenProps } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllRuleAction, createRuleAction, deleteRuleAction, selectRule } from '../../reducers/ruleSlice'
import Toast from 'react-native-root-toast'
import { FontAwesome5 } from '@expo/vector-icons'
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: "Today's Day",
}
LocaleConfig.defaultLocale = 'en'

const timeInDay = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
]

export const CalendarScreen: FC<RootStackScreenProps<'CalendarScreen'>> = ({ navigation, route }) => {
  const app = route.params.app
  const deviceId = route.params.deviceId
  const [visible, setVisible] = useState(false)
  const [isOpenStart, setIsOpenStart] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)
  const [valueStart, setValueStart] = useState<any>(timeInDay[0])
  const [valueEnd, setValueEnd] = useState<any>(timeInDay[0])
  const [hourStart, setHourStart] = useState('')
  const [minuteStart, setMinuteStart] = useState('')
  const [hourEnd, setHourEnd] = useState('')
  const [minuteEnd, setMinuteEnd] = useState('')
  const [day, setDay] = useState<DateData>()
  const [visibleLongPress, setVisibleLongPress] = useState(false)

  const dispatch = useAppDispatch()
  const rules = useAppSelector(selectRule)

  const btnChooseDay = (day: DateData) => {
    setDay(day)
    setVisible(true)
  }

  useEffect(() => {
    dispatch(GetAllRuleAction(deviceId))
  }, [])

  const btnSetLimit = () => {
    const dayStart = dayjs(day?.dateString).startOf('day').valueOf()
    const dayEnd = dayjs(day?.dateString).endOf('day').valueOf()

    if (!hourEnd || !minuteEnd || !hourStart || !minuteStart) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    if (parseInt(hourStart) > 12 || parseInt(hourStart) < 1) {
      Alert.alert('Error', 'Hour start must be between 1 and 12')
      return
    }

    if (parseInt(hourEnd) > 12 || parseInt(hourEnd) < 1) {
      Alert.alert('Error', 'Hour end must be between 1 and 12')
      return
    }

    if (parseInt(minuteStart) > 59 || parseInt(minuteStart) < 0) {
      Alert.alert('Error', 'Minute start must be between 0 and 59')
      return
    }

    if (parseInt(minuteEnd) > 59 || parseInt(minuteEnd) < 0) {
      Alert.alert('Error', 'Minute end must be between 0 and 59')
      return
    }

    let timeStartString = `${day?.dateString} ${hourStart}:${minuteStart}:00`
    let timeEndString = `${day?.dateString} ${hourEnd}:${minuteEnd}:00`

    if (valueStart === 'PM' && parseInt(hourStart) < 12) {
      timeStartString = `${day?.dateString} ${parseInt(hourStart) + 12}:${minuteStart}:00`
    }

    if (valueEnd === 'PM' && parseInt(hourEnd) < 12) {
      timeEndString = `${day?.dateString} ${parseInt(hourEnd) + 12}:${minuteEnd}:00`
    }

    const timeStart = dayjs(`${timeStartString}`, 'YYYY-MM-DD HH:mm:ss').valueOf()
    const timeEnd = dayjs(`${timeEndString}`, 'YYYY-MM-DD HH:mm:ss').valueOf()

    if (timeStart > timeEnd) {
      Alert.alert('Error', 'Start time must be less than end time')
      return
    }

    if (timeStart < dayStart || timeStart > dayEnd) {
      Alert.alert('Error', 'Start time must be between 00:00 and 23:59')
      return
    }

    if (timeEnd < dayStart || timeEnd > dayEnd) {
      Alert.alert('Error', 'End time must be between 00:00 and 23:59')
      return
    }

    dispatch(
      createRuleAction({
        applicationId: app.id,
        enabled: true,
        endTime: `${timeEnd}`,
        startTime: `${timeStart}`,
        deviceId: deviceId,
      }),
    )
    Toast.show('Create Rule Success', {
      duration: 100,
      position: 90,
      animation: true,
      hideOnPress: true,
    })
    navigation.goBack()
  }

  const markedDates = rules.map((rule) => {
    const dayStart = dayjs(parseInt(rule.startTime)).format('YYYY-MM-DD')
    return {
      [dayStart]: { selected: true, marked: true, selectedColor: 'red' },
    }
  })

  const longPressModal = (day: DateData) => {
    setDay(day)
    setVisibleLongPress(true)
  }

  const btnDeleteRule = (id: number) => {
    dispatch(deleteRuleAction({ id, deviceId }))
    Toast.show('Delete Rule Success', {
      duration: 100,
      position: 90,
      animation: true,
      hideOnPress: true,
    })
    setVisibleLongPress(false)
  }

  return (
    <View>
      <Calendar
        hideExtraDays={true}
        onDayPress={(day) => btnChooseDay(day)}
        markedDates={markedDates.reduce((acc, cur) => {
          return { ...acc, ...cur }
        }, {})}
        onDayLongPress={(day) => longPressModal(day)}
      />
      <Modal visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.contentModal}>
            <View style={styles.container}>
              <View style={styles.contentItem}>
                <Text style={styles.name}>Start Time</Text>
                <View style={styles.item}>
                  <Text>Hour</Text>
                  <Input inputStyle={styles.input} value={hourStart} onChangeText={setHourStart} />
                </View>
                <View style={styles.item}>
                  <Text>Minute</Text>
                  <Input inputStyle={styles.input} value={minuteStart} onChangeText={setMinuteStart} />
                </View>
                <View style={styles.item}>
                  <Text>Type</Text>
                  <DropDownPicker
                    items={timeInDay}
                    containerStyle={{ width: 100, marginTop: 15 }}
                    style={{ backgroundColor: '#fafafa' }}
                    open={isOpenStart}
                    value={valueStart}
                    dropDownDirection="BOTTOM"
                    setOpen={() => setIsOpenStart(!isOpenStart)}
                    setValue={(value) => setValueStart(value)}
                  />
                </View>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.name}>End Time</Text>
                <View style={styles.item}>
                  <Text>Hour</Text>
                  <Input inputStyle={styles.input} value={hourEnd} onChangeText={setHourEnd} />
                </View>
                <View style={styles.item}>
                  <Text>Minute</Text>
                  <Input inputStyle={styles.input} value={minuteEnd} onChangeText={setMinuteEnd} />
                </View>
                <View style={styles.item}>
                  <Text>Type</Text>
                  <DropDownPicker
                    items={timeInDay}
                    containerStyle={{ width: 100, marginTop: 15 }}
                    style={{ backgroundColor: '#fafafa' }}
                    open={isOpenEnd}
                    value={valueEnd}
                    dropDownDirection="BOTTOM"
                    setOpen={() => setIsOpenEnd(!isOpenEnd)}
                    setValue={(value) => setValueEnd(value)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.btnGroup}>
              <Button
                title="Set Limit"
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: 'blue',
                  width: 100,
                  marginRight: 10,
                }}
                onPress={() => btnSetLimit()}
              />
              <Button
                title="Back"
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: '#000000',
                  width: 100,
                }}
                onPress={() => setVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={visibleLongPress}>
        <View style={styles.modalBackground}>
          <TouchableOpacity onLongPress={() => setVisibleLongPress(false)}>
            <View style={styles.contentModal}>
              <View style={styles.listRules}>
                <ScrollView>
                  {rules
                    .filter(
                      (rule) =>
                        dayjs(parseInt(rule.startTime)).format('YYYY-MM-DD') ===
                        dayjs(day?.dateString).format('YYYY-MM-DD'),
                    )
                    .map((rule) => {
                      const timeStart = dayjs(parseInt(rule.startTime)).format('HH:mm')
                      const timeEnd = dayjs(parseInt(rule.endTime)).format('HH:mm')
                      return (
                        <View style={styles.rule} key={rule.id}>
                          <Image
                            source={{
                              uri: rule.application.image || 'https://cdn-icons-png.flaticon.com/512/49/49672.png',
                            }}
                            style={styles.image}
                          />
                          <Text style={styles.name}>{rule.application.name}</Text>

                          <View style={styles.timeGroup}>
                            <Text style={styles.name}>{timeStart}</Text>
                            <Text style={styles.name}>{timeEnd}</Text>
                          </View>
                          {rule ? (
                            <TouchableOpacity onPress={() => btnDeleteRule(rule.id || 1)}>
                              <FontAwesome5 name="trash" size={28} color="#333333" />
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                      )
                    })}
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentModal: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
    // paddingTop: '20%',
  },

  listRules: {
    height: '100%',
  },

  rule: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },

  timeGroup: {},
  image: {
    height: 90,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    resizeMode: 'contain',
    marginRight: 30,
  },
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentItem: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    flexWrap: 'wrap-reverse',
    textAlign: 'left',
  },
  input: {
    width: 30,
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 50,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
})
