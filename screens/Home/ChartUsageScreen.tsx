import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { RootStackScreenProps } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getAppByIdAction, selectAppById } from '../../reducers/applicationSlice'
import { IApplication, IWeeklyUsage } from '../../constants/interface'
import { Button } from '@rneui/base'

export const ChartUsageScreen: FC<RootStackScreenProps<'ChartUsageScreen'>> = ({ navigation, route }) => {
  const app = route.params.app
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectAppById)
  const [dataChart, setDataChart] = useState<IApplication>({} as IApplication)

  useEffect(() => {
    dispatch(getAppByIdAction(app.id))
  }, [])

  useMemo(() => {
    if (data) {
      setDataChart(data)
    }
  }, [data])

  const weeklyUsage: IWeeklyUsage = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  }

  if (dataChart && dataChart.usages) {
    for (const usage of dataChart.usages) {
      const dayOfWeek = usage.dayOfWeek
      const timeInForeground = usage.totalTimeInForeground
      if (Object.keys(weeklyUsage).includes(dayOfWeek)) {
        weeklyUsage[dayOfWeek] = Number(timeInForeground)
      }
    }
  }

  return (
    <View>
      <Text style={styles.header}>{app.name}</Text>
      <LineChart
        data={{
          labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
          datasets: [
            {
              data: Object.values(weeklyUsage),
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height / 2}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        onDataPointClick={({ value }) => Alert.alert(value + ' minute')}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          title="Limit time usage"
          titleStyle={{
            flexWrap: 'wrap',
            fontSize: 14,
          }}
          buttonStyle={{
            borderRadius: 10,
            width: 200,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  btn: {
    backgroundColor: 'red',
  },
})
