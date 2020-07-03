import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CustomHeaderButton from '../components/UI/CustomHeaderButton'

const AboutScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomHeaderButton
          title='Login'
          onPress={() => {
            navigation.navigate('AuthScreen')
          }}
        />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.screen}>
      <Text>
        We are going to change the world for the better by addressing fast
        fashion
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AboutScreen
