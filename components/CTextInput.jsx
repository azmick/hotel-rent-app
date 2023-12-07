import React from 'react'
import { View, TextInput} from 'react-native'


export const CTextInput = ({ style, functions,value,placeholder,textcolor="black",backgroundcolor= "white"}) => {
  return (
    <View>
      <TextInput
        style={[style,{backgroundColor:backgroundcolor,color:textcolor}]} 
        placeholder={placeholder}
        value={value}
      />
    </View>
  )
}

// onChangeText={(text) => setPassword(text}
