import { StyleSheet } from 'react-native'

const lojaStyles = StyleSheet.create({
    Loja: {
        color: '#fff',
        flex: 1,
        backgroundColor: '#2d353c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#fff',
        padding: 10
    },
    produtos: {
        flexDirection: 'row',
        overflow: 'scroll',
        flexWrap: 'wrap',
        justifyContent: 'center',


    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 60,
        borderRadius: 10,
    },
    btn: {
        padding: 5,
        backgroundColor: '#20252a',

    },
    textBtn: {
        backgroundColor: '#20252a',
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        textAlignVertical:'center'
    },

});
export default lojaStyles