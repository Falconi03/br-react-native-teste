import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Context } from '../../context/Context';
import Page from '../../page/Page';
import styles from './userStyles'

export default function User({ navigation }) {

    const { user, setUser } = useContext(Context)
    const [userInfo, setUserInfo] = useState()
    

    const getUser = async () => {

        try {
            const response = JSON.parse(await AsyncStorage.getItem('@br-app:user'))
            setUser(response)
        } catch (error) {
            console.log(error)
        }

    }
    const getUserInfo = async () => {

        try {
            const response = JSON.parse(await AsyncStorage.getItem('@br-app:cliente-dados'))
            setUserInfo(response.results)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getUser()
        getUserInfo()
    }, [])


    return (
        <Page navigation={navigation}>
            <ScrollView>
                {userInfo &&
                    <View style={styles.User}>
                        <Text style={styles.nome}>Dados do {user.first_name ? user.first_name : 'Usuario'}</Text>
                        {userInfo.map((loja, id) => {
                            return (
                                <View style={styles.loja} key={id}>
                                    <Text style={styles.txt}>Razão social: {loja.razao_social}</Text>
                                    <Text style={styles.txt}>Nome fantasia: {loja.nome_fantasia}</Text>
                                    <Text style={styles.txt}>CNPJ: {loja.cnpj}</Text>
                                    <Text style={styles.txt}>Estado: {loja.estado}</Text>
                                    <Text style={styles.txt}>Municipio: {loja.municipio}</Text>
                                    <Text style={styles.txt}>Bairro: {loja.bairro}</Text>
                                    <Text style={styles.txt}>CEP: {loja.cep}</Text>
                                    <Text style={styles.txt}>Enderço: {loja.endereco}</Text>
                                    <Text style={styles.txt}>Código - Loja: {loja.codigo}</Text>
                                </View>
                            )
                        })}
                    </View>
                }
            </ScrollView>
        </Page>
    );
}

