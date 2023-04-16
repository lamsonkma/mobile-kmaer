/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IApplication, IDevice, IUser } from './constants/interface'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined
  Modal: undefined
  NotFound: undefined
  SignIn: undefined
  SignUp: undefined
  Home: NavigatorScreenParams<RootTabParamList> | undefined
  Splash: undefined
  AddDeviceScreen: undefined
  ScanQrCode: { setToken(token: string): void }
  ForgotPasswordScreen: undefined
  ApplicationScreen: { device: IDevice }
  ChartUsageScreen: { app: IApplication }
  ProfileScreen: { user: IUser }
  ChangePasswordScreen: undefined
  EditDeviceScreen: { device: IDevice }
  NewPassWordScreen: undefined
  CalendarScreen: { app: IApplication; deviceId: number }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  RootTab: undefined
  List: undefined
  CV: undefined
  Application: undefined
  Devices: undefined
  Settings: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
