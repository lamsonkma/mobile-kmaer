/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors, { blackColor, mainColor, whiteColor } from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import RootScreen from '../screens/LoginScreen/RootScreen'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import SignInScreen from '../screens/LoginScreen/SignInScreen'
import SignUpScreen from '../screens/LoginScreen/SignUpScreen'
import HomeScreen from '../screens/Home/HomeScreen'

import { selectIsLoggedIn, selectLoading } from '../reducers/authSlice'
import { useAppDispatch, useAppSelector } from '../app/hook'
import SplashScreen from '../screens/SplashScreen'
import { GetSelfAction } from '../reducers/userSlice'
import { useEffect } from 'react'
import AddDeviceScreen from '../screens/Home/AddDeviceScreen'
import { ScanQrCode } from '../components/ScanQrCode'
import { ForgotPasswordScreen } from '../screens/LoginScreen/ForgotPassword'
import { SettingScreen } from '../screens/Setting/SettingScreen'
import { ListApplicationCard } from '../components/ListApplicationCard'
import { ChartUsageScreen } from '../screens/Home/ChartUsageScreen'
import { ProfileScreen } from '../screens/Setting/ProfileScreen'
import { ChangePasswordScreen } from '../screens/Setting/ChangePasswordScreen'
import { EditDeviceScreen } from '../screens/Home/EditDeviceScreen'
import { CalendarScreen } from '../screens/Rule/CalendarScreen'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const loading = useAppSelector(selectLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (loading == 'loading') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      {!(isLoggedIn && loading === 'success') ? (
        <>
          <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Screen name="AddDeviceScreen" component={AddDeviceScreen} options={{ title: 'Add Device' }} />
          <Stack.Screen name="EditDeviceScreen" component={EditDeviceScreen} options={{ title: 'Edit Device' }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ title: 'Setting' }} />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{ title: 'Change Password ' }}
          />
          <Stack.Screen
            name="ChartUsageScreen"
            component={ChartUsageScreen}
            options={{ title: 'Time Usage in week' }}
          />
          <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
          <Stack.Screen
            name="ApplicationScreen"
            component={ListApplicationCard}
            options={{
              title: 'Application',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Forgot Password',
            }}
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />

          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const color = '#59CE8F'
  return (
    <BottomTab.Navigator
      initialRouteName="RootTab"
      screenOptions={{
        tabBarActiveTintColor: mainColor,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: whiteColor,
        },
        headerStyle: { backgroundColor: whiteColor },
      }}
    >
      <BottomTab.Screen
        name="Devices"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Devices'>) => ({
          title: 'Home',
          headerTitleAlign: 'center',
          headerTintColor: '#333333',
          tabBarLabelStyle: { color: '#333333' },
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={28} color="#333333" />,
          headerRight: () => (
            <Feather
              name="plus-circle"
              size={25}
              style={{
                marginRight: 20,
              }}
              onPress={() => navigation.navigate('AddDeviceScreen')}
            />
          ),
        })}
      />

      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={({ navigation }: RootTabScreenProps<'Settings'>) => ({
          title: 'Setting',
          headerTitleAlign: 'center',
          headerTintColor: '#333333',
          tabBarLabelStyle: { color: '#333333' },
          tabBarIcon: ({ color }) => <FontAwesome5 name="cog" size={28} color="#333333" />,
        })}
      />
    </BottomTab.Navigator>
  )
}
