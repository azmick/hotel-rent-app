import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


export const CButton = ({ style, functions, textcolor = "white", title = "Button", backgroundcolor = "blue"}) => {
  return (
    <View>
      <TouchableOpacity style={[style, { backgroundColor: backgroundcolor }]} onPress={functions}>
        <Text style={{ color: textcolor }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

