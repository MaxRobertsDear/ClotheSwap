import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface iInput {
  label: string;
  errorText: boolean;
  placeholder?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  secureTextEntry?: boolean;
  minLength?: number;
  returnKeyType?:
    | 'default'
    | 'none'
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
  value?: string;
  onChangeText?: (input: string) => void;
  autoCorrect?: boolean;
  multiline?: boolean;
  maxLength?: number;
  onBlur?: () => void;
}

const Input = ({ label, errorText, ...props }: iInput) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
      {!errorText && <Text>Please enter a valid {label}</Text>}
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
