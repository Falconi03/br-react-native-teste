import React, { useState } from 'react';
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


    const login = () => {
        const bodyparameters = { email: email, password: password }
        axios.post(`https://app.brms.com.br/api/v1/accounts/login/`, bodyparameters)
            .then(async (res) => {
                console.log(res.status)
                const results = res.data.data
                try {
                    await AsyncStorage.setItem('@br-app:user', JSON.stringify(res.data.data))
                } catch (error) {
                    console.log('NÃO FOI ARMAZENAR O USUARIO!', error)
                }
                navigation.navigate('Load' ,{results})
            })
            .catch((error) => {
                console.log(error.response)
            });
    }

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
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

