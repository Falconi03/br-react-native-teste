import { StyleSheet } from 'react-native'

const produtoStyles = StyleSheet.create({
    produto: {
        width: '95%',
        marginVertical: 10,
        color: '#fff',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center'
    },
    img: {
        width: '100%',
        height: 400,
    },
    prodDescricao: {
        fontWeight: '500',
        fontSize: 18,
        color: '#777',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    corButtons: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    corBtn: {
        padding: 5,
        margin: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 10,
    },
    corBtnText: {
        color: '#aaa'
    },
    allValores: {
        paddingVertical: 15,

    },
    valores: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignSelf: 'flex-start'
    },
    valorText: {
        alignSelf: 'flex-start',
        width: '60%'
    },

});
export default produtoStyles