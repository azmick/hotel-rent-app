import React from 'react'
import { View, TextInput} from 'react-native'


export const CTextInput = ({ style, functions, textcolor = "white", title = "Button", backgroundcolor = "blue"}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
    </View>
  )
}

