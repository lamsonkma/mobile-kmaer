import Constants from 'expo-constants'
import { ImageInfo } from 'expo-image-picker'

export const cloudinaryConfig = Constants?.manifest?.extra?.cloudinary || {}

export const makeUploadFormData = (photo: ImageInfo) => {
  const data = new FormData()
  data.append('file', `data:image/jpeg;base64,${photo.base64}`)
  data.append('upload_preset', cloudinaryConfig.uploadPreset)
  data.append('cloud_name', cloudinaryConfig.cloudName)
  return data
}

export const uploadImage = (photo: ImageInfo) => {
  const data = makeUploadFormData(photo)
  return fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, {
    method: 'post',
    body: data,
  }).then((res) => res.json())
}
