import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, Image } from '@rneui/themed'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { mainColor } from '../../constants/Colors'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { RootStackScreenProps } from '../../types'
import { logoutAction } from '../../reducers/authSlice'
import { GetSelfAction, UpdateUserAction, selectUser } from '../../reducers/userSlice'
import SplashScreen from '../SplashScreen'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '../../app/cloudinary'

export const SettingScreen = () => {
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [image, setImage] = React.useState(user?.image)
  useEffect(() => {
    dispatch(GetSelfAction())
  }, [])

  // useEffect(() => {
  //   setImage(user?.image)
  // }, [user])

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Đồng ý', onPress: () => dispatch(logoutAction()) },
      {
        text: 'Hủy bỏ',
        style: 'cancel',
      },
    ])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })

    if (!result.cancelled) {
      const { secure_url: newImageUrl } = await uploadImage(result)
      dispatch(UpdateUserAction({ image: newImageUrl }))
      setImage(newImageUrl)
    }
  }


  const updateAvatar = () => {
    Alert.alert('Update avater', 'You want to update avatar?', [
      { text: 'Yes', onPress: pickImage },
      {
        text: 'No',
        style: 'cancel',
      },
    ])
  }
  if (!user) return <SplashScreen />

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 50,
        }}
      >
        <Image
          source={{
            uri: user.image,
          }}
          style={styles.avatar}
          onPress={() => updateAvatar()}
        />
        <View>
          <Text style={styles.text}>{user?.name}</Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Infomation</Text>
            <View style={styles.listItem}>
              <TouchableOpacity
                style={styles.item}
                activeOpacity={0.6}
                onPress={() => nav.navigate('ProfileScreen', { user })}
              >
                <View
                  style={{
                    borderRadius: 5,
                    padding: 5,
                    width: 30,
                    height: 30,
                  }}
                >
                  <Icon name="user" type="font-awesome" size={20} color="#333333" solid={true} />
                </View>
                <View
                  style={{
                    flex: 2,
                    marginLeft: 30,
                  }}
                >
                  <Text style={styles.text}>Account</Text>
                </View>
                <Icon name="angle-right" type="font-awesome" color="#333333" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.item} activeOpacity={0.8}>
                <View
                  style={{
                    borderRadius: 5,
                    padding: 5,
                    width: 30,
                    height: 30,
                  }}
                >
                  <Icon name="bell" type="font-awesome" color="#333333" size={20} solid={true} />
                </View>
                <View
                  style={{
                    flex: 2,
                    marginLeft: 30,
                  }}
                >
                  <Text style={styles.text}>Notification</Text>
                </View>
                <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Orther</Text>
            <View style={styles.listItem}>
              <TouchableOpacity style={styles.item} activeOpacity={0.8}>
                <View
                  style={{
                    borderRadius: 5,
                    padding: 5,
                    width: 30,
                    height: 30,
                  }}
                >
                  <Icon name="life-ring" type="font-awesome" color="#333333" size={20} />
                </View>
                <View
                  style={{
                    flex: 2,
                    marginLeft: 30,
                  }}
                >
                  <Text style={styles.text}>Help & Feedback</Text>
                </View>
                <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#333333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={handleLogout}>
                <View
                  style={{
                    borderRadius: 5,
                    padding: 5,
                    width: 30,
                    height: 30,
                  }}
                >
                  <Icon name="log-out" type="feather" color="#333333" size={20} />
                </View>
                <View
                  style={{
                    flex: 2,
                    marginLeft: 30,
                  }}
                >
                  <Text style={styles.text}>Logout</Text>
                </View>
                <Icon name="angle-right" type="font-awesome" style={{ flex: 1 }} color="#333333" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    resizeMode: 'stretch',
    borderRadius: 50,
    borderWidth: 0.25,
    borderColor: '#333333',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
    color: '#333333',
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.8,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flexWrap: 'wrap',
  },
})
