import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import style from './plusStyle'
import Page from '../../page/Page';

export default function Plus({ navigation }) {
    return (
        <View style={style.container}>
            <Page navigation={navigation}>
                <View style={style.Plus}>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Home')}>
                        <Icon style={style.icon} name='th-large' color='#fff' size={20} />
                        <Text style={style.PlusText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Banco de Imagem')} >
                        <Icon style={style.icon} name='image' color='#fff' size={20} />
                        <Text style={style.PlusText}>Banco Imagem</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Estoque')}>
                        <Icon style={style.icon} name='cubes' color='#fff' size={20} />
                        <Text style={style.PlusText}>Estoque</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Financeiro')}>
                        <Icon style={style.icon} name='dollar-sign' color='#fff' size={20} />
                        <Text style={style.PlusText}>Financeiro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Loja')}>
                        <Icon style={style.icon} name='store' color='#fff' size={20} />
                        <Text style={style.PlusText}>Loja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('User')}>
                        <Icon style={style.icon} name='user' color='#fff' size={20} />
                        <Text style={style.PlusText}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Plus')}>
                        <Icon style={style.icon} name='shopping-cart' color='#fff' size={20} />
                        <Text style={style.PlusText}>Seu Carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Plus')}>
                        <Icon style={style.icon} name='credit-card' color='#fff' size={20} />
                        <Text style={style.PlusText}>Suas Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.PlusBtn} onPress={() => navigation.navigate('Login')}>
                        <Icon style={style.icon} name='sign-out-alt' color='#fff' size={20} />
                        <Text style={style.PlusText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </Page>
        </View>
    );
}

