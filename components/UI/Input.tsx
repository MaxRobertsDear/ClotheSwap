import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const Input = (props: any) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
      {!props.errorText && <Text>Please enter a valid {props.label}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default Input
