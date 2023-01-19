import { StyleSheet } from 'react-native'

const homeStyles = StyleSheet.create({
    Home: {
        color: '#fff',
        backgroundColor: '#2d353c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingBottom: 70,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    homeImg: {
        width: 'auto',
        height: 70,
        backgroundColor: '#000'
    },
    homeContainerText1: {
        padding: 10,
        backgroundColor: '#000',
    },
    homeContainerText2: {
        padding: 10,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    homeText: {
        color: '#fff',
        textAlign: 'center'
    },
    homeLink: {
        backgroundColor: '#ff0000',
        alignItems: 'center',
        padding: 10,
        width: '95%',
        borderRadius: 10,
        margin: 10,
    }
});

export default homeStyles