import { StyleSheet, View } from 'react-native'
import { FC, useEffect, useMemo, useState } from 'react'
import { ListJobCard } from '../../components/ListJobCard'
import { ICompany, IJob } from '../../constants/interface'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { selectJobs } from '../../reducers/jobSlice'
import { RootStackScreenProps } from '../../types'
import SplashScreen from '../SplashScreen'
import { GetJobsByCompanyAction, selectJobsCompany, selectLoading } from '../../reducers/companySlice'

export const ListJobCompanyScreen: FC<RootStackScreenProps<'CompanyList'>> = ({ route }) => {
  const id = route.params.id
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(selectJobsCompany)
  const [page, setPage] = useState(1)
  useEffect(() => {
    dispatch(
      GetJobsByCompanyAction({
        id,
        page,
      }),
    )
  }, [id, page])
  const loading = useAppSelector(selectLoading)

  if (loading == 'loading') {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      <ListJobCard data={jobs} title={`Công việc tại đây`} page={page} setPage={setPage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FDFDFD',
  },
})
