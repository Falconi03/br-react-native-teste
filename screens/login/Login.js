import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import style from './loginStyles'


export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [access, setAccess] = useState('')
    const [nextPage, setNextPage] = useState(null)

    const config = {
        headers: {
            'Authorization': 'Bearer ' + access
        }
    }

    const login = () => {
        const bodyparameters = { email: email, password: password }
        axios.post(`https://app.brms.com.br/api/v1/accounts/login/`, bodyparameters)
            .then((res) => {
                console.log(res.status)
                setAccess(res.data.data.token.access)

            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    const firstEstoque = () => {
        axios.get(`https://app.brms.com.br/api/v1/estoque/saldo/?limit=9000`, config)
            .then(async (res) => {
                console.log(res.status)
                setNextPage(res.data.next)
                try {
                    await AsyncStorage.setItem(`@br-app:estoque-https://app.brms.com.br/api/v1/estoque/saldo/?limit=9000`, JSON.stringify(res.data))
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR O ESTOQUE', error)
                } finally {

                }

            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    useEffect(() => {
        if (nextPage !== null) {
            axios.get(`${String(nextPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setNextPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-app:estoque-${String(storageName)}`, JSON.stringify(res.data))
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR O ESTOQUE', error)
                    } finally {

                    }

                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [nextPage])

    const firstProdutos = () => {
        axios.get(`https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, config)
            .then(async (res) => {
                console.log(res.status)
                setNextPage(res.data.next)
                try {
                    await AsyncStorage.setItem(`@br-app:produto-all-https://app.brms.com.br/api/v1/produto/lista_produto_all_2/?limit=9000`, JSON.stringify(res.data))
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR OS PRODUTOS', error)
                } finally {

                }

            })
            .catch((error) => {
                console.log(error.response)
            });
    }

    useEffect(() => {
        if (nextPage !== null) {
            axios.get(`${String(nextPage)}`, config)
                .then(async (res) => {
                    console.log(res.status)
                    const storageName = res.data.next
                    setNextPage(res.data.next)
                    try {
                        await AsyncStorage.setItem(`@br-produto-all-${String(storageName)}`, JSON.stringify(res.data))
                    } catch (error) {
                        console.log('NÃO FOI POSSIVEL BAIXAR OS PRODUTOS', error)
                    } finally {

                    }

                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    }, [nextPage])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={style.Login}>
                <View>
                    <Image style={style.loginImg} source={require('../../assets/br_branco-semfundo.png')} />
                    <Text style={style.titleLogin}>BR-Motorsport</Text>
                </View>
                <View style={style.formLogin}>
                    <Text style={style.textLogin}>Usuario:</Text>
                    <TextInput
                        style={style.inputLogin}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={setEmail}
                        value={email} />
                    <Text style={style.textLogin}>Senha:</Text>
                    <TextInput style={style.inputLogin} secureTextEntry={true} onChangeText={setPassword} value={password} />
                    <TouchableOpacity style={style.btnLogin} onPress={() => login()}>
                        <Text style={style.textBtn}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnLogin} onPress={() => firstEstoque()}>
                        <Text style={style.textBtn}>Estoque</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.btnLogin} onPress={() => firstProdutos()}>
                        <Text style={style.textBtn}>Produtos</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

