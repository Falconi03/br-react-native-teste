import { StyleSheet } from 'react-native'

const miniCardStyle = StyleSheet.create({
    MiniCard: {
        backgroundColor: '#fff',
        height: 300,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        paddingBottom: 5
    },
    img: {
        width: '100%',
        height: 100
    },
    descricao: {
        height: 100,
        color: '#333',
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
    preco: {
        height: 100,
        padding: 5
    },
    precoText: {
        textAlign: 'center'
    },
})
export default miniCardStyle