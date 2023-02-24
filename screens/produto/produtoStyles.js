import { StyleSheet } from 'react-native'

const produtoStyles = StyleSheet.create({
    Produto: {
        flexDirection: 'row',
        width: '95%',
        marginVertical: 20,
        paddingVertical: 20,
        color: '#fff',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden'
        
    },
    produtoContent:{
        width: '85%',
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
    },
    img: {
        width: '100%',
        height: 350,
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
    linhaProduto: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-around'
    },
    linhaItem: {
        width:'30%',
        textAlign:'center',
    },
    selectQnt: {
        width:'30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    btnQnt:{
        width: '33%',
        justifyContent:'center',
        alignItems:'center'
    },
    qnt:{
        textAlign:'center',
        width: '33%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#aaa',
    },
    miniImgs:{
        width: '15%'
    },
    miniImg:{
        marginVertical: 8,
        width: '100%',
        height: 50,
    },

});
export default produtoStyles