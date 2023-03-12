import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FieldConfig, FieldInputProps, FieldProps } from 'formik'

interface Props {
  //   field: FieldProps;
  //   form: object;

  type: string
  label: string
  placeholder: string
  disabled: boolean
}
export const InputFiled: React.FC<FieldProps<any> & Props> = ({ field, form, placeholder }) => {
  const { name, onChange } = field
  return (
    <View>
      <Text>{placeholder}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
