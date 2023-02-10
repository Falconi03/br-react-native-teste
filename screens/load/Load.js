import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import axios from 'axios';
import styles from './loadStyles'

const Load = ({ navigation }) => {

    const [estoque, setEstoque] = useState(false)
    const [produto, setProduto] = useState(false)
    const [estoquePage, setEstoquePage] = useState(null)
    const [produtoPage, setProdutoPage] = useState(null)
    const [access, setAccess] = useState('')

    useEffect(() => {
        const getUser = async () => {
            try {
                let response = await AsyncStorage.getItem('@br-app:user')
                setAccess(JSON.parse(response).token.access)
            } catch (error) {
                console.log(error.message)
                props.navigation.navigate('Login')
            }
        }
        getUser()
    }, [])

    const config = {
        headers: {
            'Authorization': 'Bearer ' + access
        }
    }

    useEffect(() => {
        if (access.length > 0) {
            const firstEstoque = () => {
                axios.get(`https://app.brms.com.br/api/v1/estoque/saldo/?limit=9000`, config)
                    .then(async (res) => {
                        console.log('estoque', res.status)
                        setEstoquePage(res.data.next)
                        try {
                            await AsyncStorage.setItem(`@br-app:estoque-https://app.brms.com.br/api/v1/estoque/saldo/?limit=9000`, JSON.stringify(res.data))
                            setEstoque(res.data.next === null ? true : false)
                        } catch (error) {
                            console.log('NÃO FOI POSSIVEL BAIXAR O ESTOQUE', error)
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                    });
            }
            const firstProdutos = () => {
                axios.get(`https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, config)
                    .then(async (res) => {
                        console.log('produto', res.status)
                        setProdutoPage(res.data.next)
                        try {
                            await AsyncStorage.setItem(`@br-app:produto-all-https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, JSON.stringify(res.data))
                            setProduto(res.data.next === null ? true : false)
                        } catch (error) {
                            console.log('NÃO FOI POSSIVEL BAIXAR OS PRODUTOS', error)
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                    });
            }

            firstEstoque()
            firstProdutos()
        }
    }, [access])

    useEffect(() => {
        if (estoquePage !== null) {
            console.log(`${String(estoquePage)}`)
            axios.get(`${String(estoquePage)}`, config)

                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setEstoquePage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-app:estoque-${String(storageName)}`, JSON.stringify(res.data))
                        setEstoque(res.data.next === null ? true : false)
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR O ESTOQUE', error)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [estoquePage])


    useEffect(() => {
        if (produtoPage !== null) {
            axios.get(`${String(produtoPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setProdutoPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-produto-all-${String(storageName)}`, JSON.stringify(res.data))
                        setProduto(res.data.next === null ? true : false)
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR OS PRODUTOS', error)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [produtoPage])

    if (produto && estoque){
        navigation.navigate('Home')
    }

    return (
        <View style={styles.Load}>
            <Text style={styles.loadText}>Estamos atualizando os dados do app.</Text>
            <Text style={styles.loadText}>Aguarde um momento por favor!</Text>
            <ActivityIndicator
                size='large'
                color='white'
                animating={true}
                style={styles.loading} />
        </View>
    )
}
export default Load