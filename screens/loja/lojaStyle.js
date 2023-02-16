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
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        paddingTop: 10

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
        textAlignVertical: 'center'
    },
    search: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 40
        
    },
    searchText: {
        color: '#fff',
        fontSize: 20,
        textAlignVertical:'center'
        
    },
    searchInput: {
        backgroundColor: '#fff',
        width: '50%',
        borderRadius: 10,
        textAlign:'center',
        textAlignVertical:'center'
        
    }

});
export default lojaStyles