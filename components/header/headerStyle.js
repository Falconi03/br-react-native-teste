import { StyleSheet } from 'react-native'

const headerStyle = StyleSheet.create({
    Header: {
        backgroundColor: '#000',
        paddingTop: 40,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 30,
        height: 30
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 10
    },
})
export default headerStyle