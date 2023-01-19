import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
    Login: {
        backgroundColor: '#000',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    loginImg: {
        width: 150,
        height: 150,
    },
    titleLogin: {
        color: '#fff',
        fontSize: 30,
    },
    formLogin: {
        width: '100%',
        alignItems: 'center'
    },
    textLogin: {
        color: '#fff',
        padding: 10,
        paddingLeft: 45,
        alignSelf: 'baseline'
    },
    inputLogin: {
        backgroundColor: '#ddd',
        color: '#333',
        width: '80%',
        borderRadius: 10,
        textAlign: 'center'
    },
    btnLogin: {
        marginTop: 40,
        backgroundColor: '#198754',
        padding: 5,
        width: '80%',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 10
    },
    textBtn: {
        fontSize: 18,
        color: '#fff'
    }
})
export default loginStyles