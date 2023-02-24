import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import axios from 'axios';
import styles from './loadStyles'

const Load = (props) => {

    const access = props.route.params.results.token.access

    const [produto, setProduto] = useState(false)
    const [eachProduto, setEachProduto] = useState(false)
    const [clienteDados, setClienteDados] = useState(false)
    const [carrinho, setCarrinho] = useState(false)
    const strogeNames = []
    let resultsCopy = []
    const produtosId = []
    const config = {
        headers: {
            'Authorization': 'Bearer ' + access
        }
    }


    const getProdutos = () => {
        axios.get(`https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, config)
            .then(async (res) => {
                console.log('produto', res.status)
                try {
                    await AsyncStorage.setItem(`@br-app:produto-all-https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, JSON.stringify(res.data))
                    setProduto(res.data.next === null ? true : false)
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR OS PRODUTOS', error)
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    navigation.navigate('Login')
                }
            });
    }
    const getCarrinho = () => {
        axios.get(`https://app.brms.com.br/api/v1/pedido/pedido/`, config)
            .then(async (res) => {
                console.log('pedido', res.status)
                try {
                    await AsyncStorage.setItem('@br-app:pedido', JSON.stringify(res.data))
                    setCarrinho(res.data.next === null ? true : false)
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR OS PEDIDOS', error)
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    navigation.navigate('Login')
                }
            });

    }
    const getClienteDados = () => {
        axios.get(`https://app.brms.com.br/api/v1/cliente/get_cliente/`, config)
            .then(async (res) => {
                console.log('cliente dados', res.status)
                try {
                    await AsyncStorage.setItem('@br-app:cliente-dados', JSON.stringify(res.data))
                    setClienteDados(res.data.next === null ? true : false)
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR OS DADOS DO CLIENTE', error)
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (error.response.status === 401) {
                    navigation.navigate('Login')
                }
            });

    }


    const getEachProdutos = async () => {
        try {
            const response = await AsyncStorage.getAllKeys()
            response.map((name, id) => {
                if (name.includes('@br-app:produto-all')) {
                    strogeNames.push(name)
                }
            })
        } catch (error) {
            console.log(error)
        }
        strogeNames.map(async (name, id) => {
            try {
                const response = JSON.parse(await AsyncStorage.getItem(name))
                const results = response.results
                resultsCopy = [...resultsCopy, ...results]
                if (strogeNames.length === id + 1) {
                    resultsCopy.map((produto) => {
                        if (produtosId.find((e) => e === produto.id)) {
                            null
                        } else {
                            produtosId.push(produto.id)

                        }
                    })
                    produtosId.map((produtoId, id) => {

                        axios.get(`https://app.brms.com.br/api/v1/produto/lista_produto_2/?id=${produtoId}`, config)
                            .then(async (res) => {
                                try {
                                    await AsyncStorage.setItem(`@br-app:produto-${String(produtoId)}`, JSON.stringify(res.data))
                                    console.log(id+1 +" de " + produtosId.length )
                                    if (id + 1 === produtosId.length) {
                                        console.log('each produto 200')
                                        setEachProduto(true)
                                    }
                                } catch (error) {
                                    console.log(`NÃO FOI POSSIVEL BAIXAR O PRODUTO ${produtoId}`, error)
                                }
                            })
                            .catch((error) => {
                                console.log(error.response)
                            });
                    })
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        getProdutos()
        getCarrinho()
        getClienteDados()
    }, [])

    useEffect(() => {
        if (produto) {
            getEachProdutos()
        }
    }, [produto])

    if (produto && eachProduto && carrinho && clienteDados) {
        props.navigation.navigate('Home')
    } else {

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
}
export default Load