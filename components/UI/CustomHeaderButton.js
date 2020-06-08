import React from 'react'
import Platform from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../../constants/Colors'

const CustomHeaderButton = (props) => {
  return (
    <Icon.Button
      {...props}
      // eslint-disable-next-line react/prop-types
      name={props.iconName}
      backgroundColor='white'
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
      size={23}
      TouchableComponent
    ></Icon.Button>
  )
}

export default CustomHeaderButton
