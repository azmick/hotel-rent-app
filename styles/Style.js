import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    innerContainer: {
        backgroundColor: 'rgb(103, 80, 164)',
        padding: 50,
        borderRadius: 10,
        // width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white'
    },
    input: {
        width: Dimensions.get('window').width / 1.7,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 5,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 5
    },
    passInput: {
        flexDirection: 'row',
        width: Dimensions.get('window').width / 2,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 5,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        margin: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    groupButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    passView: {
        flexDirection: 'row',
        margin: 8,
    },
    eyesView:{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 3,
        marginLeft: 3,
        marginBottom: 5
    },
    card: {
        margin: 4,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.45,
        textAlign: 'center',
        fontSize: 12,
        padding: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        
      },
      shareButton: {
        backgroundColor:'white',
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:20,
        borderColor: 'rgb(103, 80, 164)',
        borderStyle: 'solid',
        borderWidth: 0.5,
      },
      cardButton: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.075,
        flexDirection: 'row', 
        marginRight: 11
        
    }
});
