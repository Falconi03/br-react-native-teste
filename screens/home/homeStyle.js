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
        paddingTop:20,
        paddingBottom: 70,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden'
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    homeImg: {
        width: 1000,
        height: 170,
        backgroundColor: '#000',
        
    },
    homeContainerText: {
        width: "100%",
        paddingVertical: 30,
        paddingHorizontal: 20,
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
        paddingVertical: 10,
        width: '95%',
        borderRadius: 10,
        margin: 10,
    }
});

export default homeStyles