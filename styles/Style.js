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
        backgroundColor: 'skyblue',
        padding: 50,
        borderRadius: 10,
        // width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white'
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 5
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
    eyesView:{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 3,
        marginLeft: 3,
        marginBottom: 5
    },
});
