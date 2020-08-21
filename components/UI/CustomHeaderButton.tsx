import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

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
      backgroundColor='white'
      color={Colors.primary}
      size={23}
    ></Icon.Button>
  )
}

export default CustomHeaderButton
