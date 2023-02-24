import { StyleSheet } from 'react-native'

const homeStyles = StyleSheet.create({
     Home: {
        height: '100%',
        backgroundColor: '#2d353c',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
        overflow: 'hidden'
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