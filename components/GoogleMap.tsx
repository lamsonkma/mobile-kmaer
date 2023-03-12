import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions, Alert, Modal } from 'react-native'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Constants from 'expo-constants'
import { Button } from '@rneui/themed'
import { Feather } from '@expo/vector-icons'

export interface GoogleMapState {
  latitude: number
  longitude: number
}

export interface GoogleMapProps {
  modalLocation: boolean
  setModalLocation: Function
  location: GoogleMapState
  setLocation: (location: GoogleMapState) => void
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ modalLocation, setModalLocation, location, setLocation }) => {
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }
    getLocation()
  }, [])
  if (!modalLocation) {
    return null
  }
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red',
      }}
    >
      <View style={{ position: 'absolute', width: '100%', zIndex: 1, top: 10 }}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          isRowScrollable={false}
          // renderDescription={(row) => row.description}
          styles={{
            textInputContainer: {
              marginHorizontal: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            },
            textInput: {
              height: 50,
              fontSize: 18,
              paddingRight: 40,
              marginTop: 50,
            },
            listView: {
              marginHorizontal: 10,
            },
          }}
          placeholder="Search"
          // currentLocation={true}
          onPress={(data, details = null) => {
            console.log(data.description)
            if (details) {
              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
            }
          }}
          query={{
            key: Constants?.manifest?.extra?.googleApiKey,
            language: 'vi',
          }}
          renderRightButton={() => (
            <Feather
              name="arrow-right"
              size={24}
              style={{ position: 'absolute', right: 10, top: 65 }}
              onPress={() => setModalLocation(false)}
            />
          )}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <MapView
          // minDelta={10}
          // minZoomLevel={15}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 20.980194953622984,
            longitude: 105.79615346430842,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLongPress={(e) => {
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.006,
          }}
          style={styles.map}
          showsUserLocation={true}
        >
          {location && <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />}
          <View style={{ position: 'absolute' }}></View>
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    flex: 1,
    display: 'flex',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
