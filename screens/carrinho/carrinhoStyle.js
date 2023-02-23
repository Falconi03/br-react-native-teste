import { StyleSheet } from "react-native";

const carrinhoStyle = StyleSheet.create({
    Carrinho: {
        width: '95%',
        marginVertical: 20,
        color: '#fff',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        paddingVertical: 20,
        
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 20

    },
    produtos: {
        width: '100%',
        alignItems: 'center'
    },
    produto: {
        borderTopWidth: 1,
        borderColor: '#aaa',
        width: '95%',
        padding: 5,
        flexDirection: 'row',


    },
    img: {
        width: '30%',
        height: 100,
    },
    info: {
        width: '70%',
    },
    descricao: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
    codigo: {
        marginVertical: 5,
    },
    descricao: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
    preco: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
    btns: {
        flexDirection: 'row',
    },
    selectQnt: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    btnQnt: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    qnt: {
        textAlign: 'center',
        width: '33%',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#aaa',
    },
    btnExcluir: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center'

    },
    total: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderColor: '#aaa',
        width: '95%',
        alignItems: "flex-end"
    },
    finalizacao: {
        width: '100%',
        alignItems: 'center'
    },
    btnAlterar: {
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#212529',
    },
    btnFechar: {
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#198754',
    },
    btnApagar: {
        paddingVertical: 5,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#dc3545',
    },
})

export default carrinhoStyle