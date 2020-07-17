import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface iCard {
  style: any;
  children: ReactNode;
}

const Card = ({ style, children }: iCard) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.27,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
})

export default Card
