import React from 'react'
import { View, TextInput} from 'react-native'


export const CPassInput = ({ style, functions, textcolor = "black", backgroundcolor = "white",password}) => {
  return (
    <View>
      <TextInput
        style={[style,{color:textcolor,backgroundColor:backgroundcolor}]}
        placeholder='Şifre'
        // onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
    </View>
  )
}

