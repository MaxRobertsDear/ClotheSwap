import React, { ReactElement } from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../../constants/Colors'

interface iCustomeHeaderButton {
  iconName: string;
  onPress?: () => void;
}

const CustomHeaderButton = ({ iconName, ...props }: iCustomeHeaderButton) => {
  return (
    <Icon.Button
      {...props}
      name={iconName}
      backgroundColor={Platform.OS === 'android' ? Colors.primary : 'white'}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
      size={23}
    ></Icon.Button>
  )
}

export default CustomHeaderButton
