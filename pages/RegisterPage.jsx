import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, TextInput, Text, TouchableOpacity,Dimensions, Button, } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import {styles} from '../styles/Style'
import { CTextInput } from '../components/CTextInput';
import { CButton } from '../components/CButton'
import { CPassInput } from '../components/CPassInput'


const Register = () => {
    
    const [isPassVisible1,setIsPassVisible1] = useState(true)
    const [isPassVisible2,setIsPassVisible2] = useState(true)

    const handleRegister = () => {
        // Üye Ol butonuna basıldığındaki eylemleri kontrol et.
      };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.passView}>
                    <CTextInput style={[styles.input]} placeholder={'Kullanıcı Adı'}/>
                </View>

                <View style={styles.passView}>
                    <TextInput
                        placeholder='E-Posta'
                        style={styles.input}
                        keyboardType='email-address'
                    />
                </View>

                <View style={styles.passView}>
                    {/* <TextInput
                        placeholder='Şifre'
                        secureTextEntry={isPassVisible1}
                        style={styles.passInput}
                    /> */}
                    <CPassInput title='Şifre' secureTextEntry={isPassVisible1} style={styles.passInput}/>
                    <TouchableOpacity style={styles.eyesView} onPress={()=>{setIsPassVisible1((prev) => !prev)}}>
                        <Entypo name =  {isPassVisible1 ? "eye": "eye-with-line"} size={24} color="black" />
                    </TouchableOpacity>
                </View>



                <View style={styles.passView}>
                    {/* <TextInput
                        placeholder='Şifre Doğrula'
                        secureTextEntry={isPassVisible2}
                        style={styles.passInput}
                    /> */}
                    <CPassInput title='Şifre' secureTextEntry={isPassVisible1} style={styles.passInput}/>
                    <TouchableOpacity style={styles.eyesView} onPress={()=>{setIsPassVisible2((prev) => !prev)}}>
                        <Entypo name={isPassVisible2 ? "eye": "eye-with-line"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <CButton title='Üye Ol' style={styles.button} backgroundcolor='blue' functions={handleRegister}/>
            </View>
        </SafeAreaView>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#9980FA'

//     },
//     // innerContainer: {
//     //     backgroundColor: '#A3CB38',
//     //     padding: 50,
//     //     borderRadius: 10,
//     //     flex: 0.25,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     // },
//     input: {
//         width: Dimensions.get('window').width/1.68,
//         flexDirection:'row',
//         borderColor: 'white',
//         borderWidth: 1,
//         marginBottom: 5,
//         paddingLeft: 8,
//         backgroundColor: 'white',
//         borderRadius: 5
        
//     },
//     passView:{
//         flexDirection: 'row',
//         margin:8,
//     },
//     passInput: {
//         flexDirection:'row',
//         width: Dimensions.get('window').width/2,
//         borderColor: 'white',
//         borderWidth: 1,
//         marginBottom: 5,
//         paddingLeft: 8,
//         backgroundColor: 'white',
//         borderRadius: 5,
//     },
//     eyesView:{
//         backgroundColor:'white',
//         borderRadius:5,
//         padding: 3,
//         marginLeft:3,
//         marginBottom: 5
//     },
// })

export default Register