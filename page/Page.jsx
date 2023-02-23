import React, { useEffect, useState } from "react";
import { View } from 'react-native';

import styles from './pageStyle'
import Menu from "../components/menu/Menu";
import Header from "../components/header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page(props) {


    useEffect(() => {
        const getUser = async () => {
            try {
                let response = await AsyncStorage.getItem('@br-app:user')
                if (JSON.parse(response) === null) {
                    props.navigation.navigate('Login')
                }
            } catch (error) {
                console.log(error.message)
                props.navigation.navigate('Login')
            }
        }
        getUser()
    }, [])


    return (

        <View style={styles.Page}>
            <Header />
            <View style={styles.conteudo}>
                {props.children}
            </View>
            <Menu navigation={props.navigation} />
        </View>
    )

}