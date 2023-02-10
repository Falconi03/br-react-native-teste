import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import axios from 'axios';
import styles from './loadStyles'

const Load = ({ navigation }) => {

    const [estoque, setEstoque] = useState(false)
    const [produto, setProduto] = useState(false)
    const [vencidos, setVencidos] = useState(false)
    const [aVencer, setaVencer] = useState(false)
    const [baixados, setBaixados] = useState(false)
    const [estoquePage, setEstoquePage] = useState(null)
    const [produtoPage, setProdutoPage] = useState(null)
    const [vencidosPage, setVencidosPage] = useState(null)
    const [aVencerPage, setaVencerPage] = useState(null)
    const [baixadosPage, setBaixadosPage] = useState(null)
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
                        if (error.response.status === 401) {
                            navigation.navigate('Login')
                        }
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
                        if (error.response.status === 401) {
                            navigation.navigate('Login')
                        }
                    });
            }
            const firstVencidos = () => {
                axios.get(`https://app.brms.com.br/api/v1/titulosreceber/vencidos/?limit=9000`, config)
                    .then(async (res) => {
                        console.log('vencidos', res.status)
                        setVencidosPage(res.data.next)
                        try {
                            await AsyncStorage.setItem(`@br-app:vencidos-https://app.brms.com.br/api/v1/titulosreceber/vencidos/?limit=9000`, JSON.stringify(res.data))
                            setVencidos(res.data.next === null ? true : false)
                        } catch (error) {
                            console.log('NÃO FOI POSSIVEL BAIXAR OS VENCIDOS', error)
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        if (error.response.status === 401) {
                            navigation.navigate('Login')
                        }
                    });
            }
            const firstaVencer = () => {
                axios.get(`https://app.brms.com.br/api/v1/titulosreceber/titulosabertos/?limit=9000`, config)
                    .then(async (res) => {
                        console.log('a vencer', res.status)
                        setaVencerPage(res.data.next)
                        try {
                            await AsyncStorage.setItem(`@br-app:a-vencer-https://app.brms.com.br/api/v1/titulosreceber/titulosabertos/?limit=9000`, JSON.stringify(res.data))
                            setaVencer(res.data.next === null ? true : false)
                        } catch (error) {
                            console.log('NÃO FOI POSSIVEL BAIXAR OS A VENCER', error)
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        if (error.response.status === 401) {
                            navigation.navigate('Login')
                        }
                    });
            }
            const firstBaixados = () => {
                axios.get(`https://app.brms.com.br/api/v1/titulosreceber/titulospagos/?limit=9000`, config)
                    .then(async (res) => {
                        console.log('baixados', res.status)
                        setBaixadosPage(res.data.next)
                        try {
                            await AsyncStorage.setItem(`@br-app:baixados-https://app.brms.com.br/api/v1/titulosreceber/titulospagos/?limit=9000`, JSON.stringify(res.data))
                            setBaixados(res.data.next === null ? true : false)
                        } catch (error) {
                            console.log('NÃO FOI POSSIVEL BAIXAR OS BAIXADOS', error)
                        }
                    })
                    .catch((error) => {
                        console.log(error.response)
                        if (error.response.status === 401) {
                            navigation.navigate('Login')
                        }
                    });
            }

            firstEstoque()
            firstProdutos()
            firstVencidos()
            firstaVencer()
            firstBaixados()
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

    useEffect(() => {
        if (vencidosPage !== null) {
            axios.get(`${String(vencidosPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setVencidosPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-vencidos-${String(storageName)}`, JSON.stringify(res.data))
                        setVencidos(res.data.next === null ? true : false)
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR OS VENCIDOS', error)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [vencidosPage])

    useEffect(() => {
        if (aVencerPage !== null) {
            axios.get(`${String(aVencerPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setaVencerPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-a-vencer-${String(storageName)}`, JSON.stringify(res.data))
                        setaVencer(res.data.next === null ? true : false)
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR OS A VENCER', error)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [aVencerPage])

    useEffect(() => {
        if (baixadosPage !== null) {
            axios.get(`${String(baixadosPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setBaixadosPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-baixados-${String(storageName)}`, JSON.stringify(res.data))
                        setBaixados(res.data.next === null ? true : false)
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR OS BAIXADOS', error)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [baixadosPage])

    if (produto && estoque) {
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